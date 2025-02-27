express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const jwt = require('jsonwebtoken');
parentDIR = path.dirname(__filename);
parentDIR = path.dirname(parentDIR);
parentDIR = path.dirname(parentDIR);

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(cookieParser());

const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT; 

// Route
router.get('/', (req, res) => {
    if (!req.cookies.token) {
        res.redirect('html/index.html');
    }
    else {
        res.redirect('html/reserve.html');
    }
}
);

const User = require('../models/user.js');
const Reservation = require('../models/reservation.js');
const Image = require('../models/image.js');
const Lab = require('../models/lab.js')

router.get('/getLabs', (req, res) => {
    Lab.find({}).then((data) => {
        res.json(data);
    });
});

router.get('/getReservations', (req, res) => {
    Reservation.find({}).then((data) => {
        res.json(data);
    });
});

router.get('/getUsers', (req, res) => {
    User.find({}).then((data) => {
        res.json(data);
    });
});

router.get('/getUser', (req, res) => {
    const email = req.query.email;
    //if there was a user found return success else return null
    User.findOne({ email: email }).then((data) => {
        res.json(data);
    });
});

router.get("/getUserReservations", (req, res) => {
    Reservation.find({ email: req.query.email }).then((data) => {
        res.json(data);
    });
});

router.get('/getLab', (req, res) => {
    const labCode = req.query.labCode;
    
    Lab.findOne({ labCode }).then((data) => {
        res.json(data);
    });
});

router.post('/addUser', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, Number(saltRounds));
        req.body.password = hashedPassword;
        
        const user = new User(req.body);

        const userData = await user.save();
        await Image.create({ email: req.body.email, image: "0" });

        res.status(201).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get("/getCredentials", (req, res) => {
    // Checks if there are cookies...
    if (req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.MYSECRET);
            const email = decoded.email;

            User.findOne({ email }).then((data) => {
                if (!data.isAdmin) {
                    res.json({ credLevel: 1, email });
                } else {
                    res.json({ credLevel: 2, email });
                }
            }).catch((err) => {
                // If verification fails, clear the invalid 'token'.
                res.clearCookie('token');
                res.json({ credLevel: 0 });
            });
        } catch (err) {
            // If verification fails, clear the invalid 'token'.
            res.clearCookie('token');
            res.json({ credLevel: 0 });
        }
    }
    // If there are no cookies, send "0" for guest.
    else {
        res.json({ credLevel: 0 });
    }
});

router.post('/login', async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const rememberMe = req.body.rememberMe;


    if (!password || !email) {
        res.status(401).json({ success: false, message: 'Login failed! Incomplete inputs.' });
    }
    else {
        let hashedPassword = await bcrypt.hash(password, Number(saltRounds));
        User.findOne({email}).then((data) => {
            if (!data) {
                res.status(401).json({ success: false, message: 'Login failed! Invalid credentials.' });
            }
            bcrypt.compare(password, data.password).then((isMatch) => {
                if (isMatch) {
                    if (rememberMe) {
                        const token = jwt.sign({ email }, process.env.MYSECRET, { expiresIn: '1h' });
                        res.cookie('token', token, {
                            httpOnly: true,
                            maxAge: 3 * 7 * 24 * 1000 * 60 * 60, // three weeks
                        });
                    } else {
                        const token = jwt.sign({ email }, process.env.MYSECRET, { expiresIn: '1h' });
                        res.cookie('token', token, {
                            httpOnly: true,
                        });
                    }
                    res.status(200).json({ success: true, message: 'Login successful!' });
                    
                } else {
                    res.status(401).json({ success: false, message: 'Login failed! Invalid credentials.' });
                }
            }).catch((error) => {
                return res.status(500).json({ success: false, message: 'An error occurred during login.' });
            });
        }).catch((err) => {
            return res.status(500).json({ success: false, message: 'An error occurred during login.' });
        });
    }
});



router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


router.get('/home', (req, res) => {
    res.sendFile(path.join(parentDIR, 'public/html/reserve.html'));
});

router.post('/addReservation', async (req, res) => {
    let last = await Reservation.find().sort({ $natural: -1 }).limit(1);
    let newresID = 1;
    if (last.length == 1)
        newresID = parseInt(last[0].reservationID.substring(1)) + 1;
    newresID = "R" + newresID.toString().padStart(7, "0");
    const reservation = new Reservation({ ...req.body, reservationID: newresID });
    
    reservation.save().then((data) => {
        res.status(201).json(data);
    }
    ).catch((error) => {
        res.status(500).json(error);
    }
    );
});

router.put("/editReservation", async (req, res) => {

    const reservationID = req.body.reservationID;
    const reservationEmail = req.body.email;
    const reservationData = req.body;

    try {

        const decoded = jwt.verify(req.cookies.token, process.env.MYSECRET);
        const email = decoded.email;

        User.findOne({ email }).then(async (data) => {
            if (data.isAdmin) {
                const editedReservation = await Reservation.updateOne(
                    { reservationID },
                    {
                        $set: {
                            labSeat: reservationData.labSeat,
                            requestDateAndTime: reservationData.requestDateAndTime,
                            reservedDateAndTime: reservationData.reservedDateAndTime
                        }
                    }
                );
                if (editedReservation.matchedCount === 0) {
                    res.status(400);
                    res.end();
                } else {
                    res.status(201);
                    res.end();
                }
            } else {
                const editedReservation = await Reservation.updateOne(
                    { reservationID, email: reservationEmail },
                    {
                        $set: reservationData
                    }
                );

                if (editedReservation.matchedCount === 0) {
                    res.status(400);
                    res.end();
                } else {
                    res.status(201);
                    res.end();
                }
            }
        }).catch((err) => {
            // If verification fails, clear the invalid 'token'.
            res.clearCookie('token');
            res.json({ credLevel: 0 });
        });

    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/updatePassword", async (req, res) => {
    const email = req.body.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    try{
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            res.status(400).json({ message: 'User not found' }); // just in case
            res.end();
            return;
        }

        const oldPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if(!oldPasswordMatch){
            res.status(401); // not proper credentials
            res.end();
            return;
        }

        const newPasswordMatch = await bcrypt.compare(newPassword, user.password);
        if (newPasswordMatch) {
            res.status(400); // cannot be same password as old password
            res.end();
            return;
        }

        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, Number(saltRounds));
        user.password = hashedNewPassword;
        await user.save();
        res.status(201);
        res.end();
        return;
    } catch (error) {
        res.status(500).json(error);
        return;
    }
});

router.put("/updateBio", async (req, res) => {
    const email = req.body.email;
    const bio = req.body.bio;
    
    const updatedBio = await User.updateOne(
        { email: email },
        { $set: { bio: bio } }
    );
    if (updatedBio.nModified === 0) {
        res.status(400);
        res.end();
    } else {
        res.status(201);
        res.end();
    }
});

router.delete('/deleteReservation', (req, res) => {
    const reservationID = req.body.reservationID;
    // Checks if there are cookies...
    if (req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.MYSECRET);
            const email = decoded.email;

            User.findOne({ email }).then((data) => {
                if (data.isAdmin) {
                    Reservation.deleteOne({ reservationID }).then((result) => {
                        console.log(result);
                    });
                    res.status(201);
                    res.end();
                } else {
                    Reservation.deleteOne({ reservationID, email }).then((result) => {
                        if (result.deletedCount == 0) {
                            res.status(400);
                            res.end();
                        } else {
                            res.status(201);
                            res.end();
                        }
                    });
                }
            }).catch((err) => {
                // If verification fails, clear the invalid 'token'.
                res.clearCookie('token');
                res.status(400);
                res.end();
            });
        } catch (err) {
            // If verification fails, clear the invalid 'token'.
            res.status(400);
            res.end();
        }
    }
    // If there are no cookies, send "0" for guest.
    else {
        res.status(403);
        res.end();
    }
});

router.delete('/deleteUser', async (req, res) => {
    if (req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.MYSECRET);
            const email = decoded.email;

            if (req.body.email == email) {
                await Reservation.deleteMany({ email });
                const deletedUser = await User.findOneAndDelete({ email });
                const deletedImage = await Image.findOneAndDelete({ email });

                if (!deletedUser || !deletedImage) {
                    res.status(404);
                    res.end();
                } else {
                    res.clearCookie('token');
                    res.status(200);
                    res.end();
                }

            } else {
                res.status(403);
                res.end();
            }
        } catch (error) {
            res.status(400);
            res.end();
        }

    } else {
        res.status(403);
        res.end();
    }

});

router.get("/getImage", (req, res) => {
    const email = req.query.email;
    Image.findOne({ email }).then((result) => {
        if (result == null) {
            res.status(400);
            res.end();
        }
        else {
            res.status(201);
            res.json(result.image);
        }
    });
})

router.put("/editImage", (req, res) => {
    const email = req.body.email;
    const image = req.body.image;
    Image.findOne({ email }).then((result) => {
        if (result == null) {
            res.status(400);
            res.end();
        }
        else {
            Image.updateOne({ email }, { $set: { image } }).then((result) => {
                res.status(201);
                res.end();
            });
        }
    });
})

router.get('/getUsersWithSubstring', (req, res) => {
    const substring = req.query.substring;
    User.find({ isAdmin: false, name: { $regex: substring, $options: 'i' } }, "email name bio").then((data) => {
        res.json(data);
    });
});

module.exports = router;
const initialize = require('../initializedb.js');
const reservation = require('../models/reservation.js');
const { appendFile } = require('fs');


//TODO: Uncomment the lines below to initialize the database
//  initialize.createUser();
//  initialize.createImage();
//  initialize.createReservations();
//  initialize.createLabs(); 
