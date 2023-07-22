const User=require('./models/user.js');
const Reservation=require('./models/reservation.js');
function createUser(){
    User.insertMany([
        {
            email: "lanz_lim@dlsu.edu.ph",
            password: "lanz_lim",
            isAdmin: false,
            name: "Lanz Lim",
            picture: "../images/lanz_lim.jpg",
            bio: "Hi, I'm Lanz, 19 years old, never learned how to read."
          },{
            email: "tyler_tan@dlsu.edu.ph",
            password: "tyler_tan",
            isAdmin: false,
            name: "Tyler Tan",
            picture: "../images/tyler_tan.jpg",
            bio: "My name is Tyler currently learning japanesse and watashiwa playing 4.5 gachas currently."
          },{
            email: "johann_uytanlet@dlsu.edu.ph",
            password: "johann_uytanlet",
            isAdmin: false,
            name: "Johann Uytanlet",
            picture: "../images/johann_uytanlet.jpg",
            bio: "Hi, I'm Johann and I wish my grades would go ap, dev. Crying into my notes if you wanna find me."
          },{
            email: "jeremy_wang@dlsu.edu.ph",
            password: "jeremy_wang",
            isAdmin: false,
            name: "Jeremy Wang",
            picture: "../images/jeremy_wang.jpg",
            bio: "Yes I am disguised toast, ask me for money if you need some. I am very rich."
          },{
            email: "cellinia_texas@dlsu.edu.ph",
            password: "cellinia_texas",
            isAdmin: false,
            name: "Cellinia Texas",
            picture: "../images/cellinia_texas.jpg",
            bio: "Hi! I'm Cellinia or you can call me Cell. I'm funnily enough I am a cowboy this has no correlation to my last name. Actually my parents disapprove very much they are very serious business people who have casted me out because of my choice of career."
          },{
            email: "gwen_stacy@dlsu.edu.ph",
            password: "gwen_stacy",
            isAdmin: false,
            name: "Gwen Stacy",
            picture: "../images/gwen_stacy.jpg",
            bio: "Hi! My name is Gwen Stacy im from earth 6969 and I watched my bestfriend turn into a giant lizard. He got into an acc and went sleepy for forever. I met this weird kid in another universe tho his name is Miles Morales."
          },{
            email: "admin1@dlsu.edu.ph",
            password: "admin1",
            isAdmin: true,
            name: "Lappland Saluzzo",
            picture: "../images/admin1.jpg",
            bio: null
          },{
            email: "admin2@dlsu.edu.ph",
            password: "admin2",
            isAdmin: true,
            name: "Tendou Alice",
            picture: "../images/admin2.jpg",
            bio: null
          },{
            email: "admin3@dlsu.edu.ph",
            password: "admin3",
            isAdmin: true,
            name: "Hayase Yuuka",
            picture: "../images/admin3.jpg",
            bio: null
          },{
            email: "admin4@dlsu.edu.ph",
            password: "admin4",
            isAdmin: true,
            name: "Koyanskaya of Light",
            picture: "../images/admin4.jpg",
            bio: null
          },{
            email: "admin5@dlsu.edu.ph",
            password: "admin5",
            isAdmin: true,
            name: "Silverwolf",
            picture: "../images/admin5.jpg",
            bio: null
          }
    ]);
}

function createReservations(){
    Reservation.insertMany([
        {
            email: "admin2@dlsu.edu.ph",
            reservationID: "R0000001",
            labSeat: {
                lab: "A2493",
                seat: "033"
            },
            reservationDate: {
                date: "2023-6-23",
                startTime: "11:03PM",
                endTime: null
            },reservedDate: {
                date: "2023-6-25",
                startTime: 17,
                endTime: 35
            },
            walkInStudent: "lanz_lim@dlsu.edu.ph",
            isAnonymous: false
        },{
            email: "tyler_tan@dlsu.edu.ph",
            reservationID: "R0000002",
            labSeat: {
                lab: "A2493",
                seat: "011"
            },
            reservationDate: {
                date: "2023-6-23",
                startTime: "5:36PM",
                endTime: null
            },reservedDate: {
                date: "2023-6-25",
                startTime: 24,
                endTime: 30
            },
            walkInStudent: null,
            isAnonymous: false
        },{
            email: "tyler_tan@dlsu.edu.ph",
            reservationID: "R0000003",
            labSeat: {
                lab: "G503",
                seat: "011"
            },
            reservationDate: {
                date: "2023-6-22",
                startTime: "7:16PM",
                endTime: null
            },reservedDate: {
                date: "2023-6-26",
                startTime: 27,
                endTime: 30
            },
            walkInStudent: null,
            isAnonymous: false
        },{
            email: "tyler_tan@dlsu.edu.ph",
            reservationID: "R0000004",
            labSeat: {
                lab: "Y021",
                seat: "121"
            },
            reservationDate: {
                date: "2023-6-24",
                startTime: "2:39PM",
                endTime: null
            },reservedDate: {
                date: "2023-6-27",
                startTime: 18,
                endTime: 33
            },
            walkInStudent: null,
            isAnonymous: false
        },{
            email: "tyler_tan@dlsu.edu.ph",
            reservationID: "R0000005",
            labSeat: {
                lab: "A2493",
                seat: "034"
            },
            reservationDate: {
                date: "2023-6-20",
                startTime: "4:09PM",
                endTime: null
            },reservedDate: {
                date: "2023-6-28",
                startTime: 18,
                endTime: 33
            },
            walkInStudent: null,
            isAnonymous: false
        },{
            email: "tyler_tan@dlsu.edu.ph",
            reservationID: "R0000006",
            labSeat: {
                lab: "G503",
                seat: "122"
            },
            reservationDate: {
                date: "2023-6-25",
                startTime: "6:10AM",
                endTime: null
            },reservedDate: {
                date: "2023-6-29",
                startTime: 18,
                endTime: 33
            },
            walkInStudent: null,
            isAnonymous: false
        },{
            email: "johann_uytanlet@dlsu.edu.ph",
            reservationID: "R0000007",
            labSeat: {
                lab: "G503",
                seat: "122"
            },
            reservationDate: {
                date: "2023-6-23",
                startTime: "9:15AM",
                endTime: null
            },reservedDate: {
                date: "2023-6-26",
                startTime: 20,
                endTime: 25
            },
            walkInStudent: null,
            isAnonymous: false
        },{
            email: "jeremy_wang@dlsu.edu.ph",
            reservationID: "R0000008",
            labSeat: {
                lab: "G503",
                seat: "122"
            },
            reservationDate: {
                date: "2023-6-24",
                startTime: "11:02AM",
                endTime: null
            },reservedDate: {
                date: "2023-6-25",
                startTime: 17,
                endTime: 30
            },
            walkInStudent: null,
            isAnonymous: false
        },{
            email: "admin1@dlsu.edu.ph",
            reservationID: "R0000009",
            labSeat: {
                lab: "G503",
                seat: "022"
            },
            reservationDate: {
                date: "2023-6-25",
                startTime: "03:08PM",
                endTime: null
            },reservedDate: {
                date: "2023-6-26",
                startTime: 25,
                endTime: 31
            },
            walkInStudent: "cellinia_texas@dlsu.edu.ph",
            isAnonymous: true
        }
    ]);
}

module.exports={createUser:createUser,createReservations:createReservations};