/* Database Design

labs
- labCode*

tables
- tableID*
- rows
- columns

users
- email*
- password
- isAdmin
- name
- picture
- bio

reservations
- email*
- reservationID*
- (lab, seat)
- (reservationDate, startTime, endTime)
- reservedDate
- walkInStudent
- isAnonymous

*/

function Lab(labCode) {
    this.labCode = labCode;
}

function Table(lab, tableID, rows, columns) {
    this.lab = lab;
    this.tableID = tableID;
    this.rows = rows;
    this.columns = columns;
}

function User(email, password, isAdmin, name, picture, bio) {
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.name = name;
    this.picture = picture;
    this.bio = bio;
}

function DateAndTime(date, startTime, endTime) {
    this.date = date;
    this.startTime = startTime; /* Can be a string or an integer. */
    this.endTime = endTime; /* Null if startTime is string, int otherwise. */
}

function LabSeat(lab, seat) {
    this.lab = lab;
    this.seat = seat;
}

function Reservation(email, reservationID, labSeat, requestDateAndTime, reservedDateAndTime, walkInStudent, isAnonymous) {
    this.email = email;
    this.reservationID = reservationID;
    this.labSeat = labSeat;
    this.requestDateAndTime = requestDateAndTime;
    this.reservedDateAndTime = reservedDateAndTime;
    this.walkInStudent = walkInStudent; /* Null if reservation is not walk-in. */
    this.isAnonymous = isAnonymous;
}

let labs = [];
labs.push(new Lab("G503"));
labs.push(new Lab("A2493"));
labs.push(new Lab("Y021"));

let tables = [];
tables.push(new Table("G503", "T0001", 4, 3));
tables.push(new Table("G503", "T0002", 4, 3));
tables.push(new Table("G503", "T0003", 3, 4));
tables.push(new Table("A2493", "T0004", 4, 10));
tables.push(new Table("Y021", "T0005", 4, 6));
tables.push(new Table("Y021", "T0006", 4, 6));

let users = [];
users.push(new User("lanz_lim@dlsu.edu.ph", "lanz_lim", false, "Lanz Lim", "../images/lanz_lim.jpg", "Hi, I'm Lanz, 19 years old, never learned how to read."));
users.push(new User("tyler_tan@dlsu.edu.ph", "tyler_tan", false, "Tyler Tan", "../images/tyler_tan.jpg", "My name is Tyler currently learning japanesse and watashiwa playing 4.5 gachas currently."));
users.push(new User("johann_uytanlet@dlsu.edu.ph", "johann_uytanlet", false, "Johann Uytanlet", "../images/johann_uytanlet.jpg", "Hi, I'm Johann and I wish my grades would go ap, dev. Crying into my notes if you wanna find me."));
users.push(new User("jeremy_wang@dlsu.edu.ph", "jeremy_wang", false, "Jeremy Wang", "../images/jeremy_wang.jpg", "Yes I am disguised toast, ask me for money if you need some. I am very rich."));
users.push(new User("cellinia_texas@dlsu.edu.ph", "cellinia_texas", false, "Cellinia Texas", "../images/cellinia_texas.png", "Hi! I'm Cellinia or you can call me Cell. I'm funnily enough I am a cowboy this has no correlation to my last name. Actually my parents disapprove very much they are very serious business people who have casted me out because of my choice of career"));
users.push(new User("gwen_stacy@dlsu.edu.ph", "gwen_stacy", false, "Gwen Stacy", "../images/gwen_stacy.png", "Hi! My name is Gwen Stacy im from earth 6969 and I watched my bestfriend turn into a giant lizard. He got into an acc and went sleepy for forever. I met this weird kid in another universe tho his name is Miles Morales."));
users.push(new User("admin1@dlsu.edu.ph", "admin1", true, "Lappland Saluzzo", "img/admin1.png", null));
users.push(new User("admin2@dlsu.edu.ph", "admin2", true, "Tendou Alice", "img/admin2.png", null));
users.push(new User("admin3@dlsu.edu.ph", "admin3", true, "Hayase Yuuka", "img/admin3.png", null));
users.push(new User("admin4@dlsu.edu.ph", "admin4", true, "Koyanskaya of Light", "img/admin4.png", null));
users.push(new User("admin5@dlsu.edu.ph", "admin5", true, "Silverwolf", "img/admin5.png", null));

let reservations = [];
reservations.push(new Reservation("admin2@dlsu.edu.ph", "R0000001", new LabSeat("A2493", "033"),
    new DateAndTime("2023-6-23", "11:03PM"), new DateAndTime("2023-6-25", 17, 35), "lanz_lim@dlsu.edu.ph", false));

reservations.push(new Reservation("tyler_tan@dlsu.edu.ph", "R0000002", new LabSeat("A2493", "011"),
    new DateAndTime("2023-6-23", "5:36PM"), new DateAndTime("2023-6-25", 24, 30), null, false));

reservations.push(new Reservation("tyler_tan@dlsu.edu.ph", "R0000003", new LabSeat("G503", "011"),
    new DateAndTime("2023-6-22", "7:16PM"), new DateAndTime("2023-6-26", 27, 30), null, false));

reservations.push(new Reservation("tyler_tan@dlsu.edu.ph", "R0000004", new LabSeat("Y021", "121"),
    new DateAndTime("2023-6-24", "2:39PM"), new DateAndTime("2023-6-27", 18, 33), null, false));

reservations.push(new Reservation("tyler_tan@dlsu.edu.ph", "R0000005", new LabSeat("A2493", "034"),
    new DateAndTime("2023-6-20", "4:09PM"), new DateAndTime("2023-6-28", 18, 33), null, false));

reservations.push(new Reservation("tyler_tan@dlsu.edu.ph", "R0000006", new LabSeat("G503", "122"),
    new DateAndTime("2023-6-25", "6:10AM"), new DateAndTime("2023-6-29", 18, 33), null, false));

reservations.push(new Reservation("johann_uytanlet@dlsu.edu.ph", "R0000007", new LabSeat("G503", "122"),
    new DateAndTime("2023-6-23", "9:15AM"), new DateAndTime("2023-6-26", 20, 25), null, false));

reservations.push(new Reservation("jeremy_wang@dlsu.edu.ph", "R0000008", new LabSeat("G503", "122"),
    new DateAndTime("2023-6-24", "11:02AM"), new DateAndTime("2023-6-25", 17, 30), null, false));

reservations.push(new Reservation("admin1@dlsu.edu.ph", "R0000009", new LabSeat("G503", "022"),
    new DateAndTime("2023-6-25", "03:08PM"), new DateAndTime("2023-6-26", 25, 31), "cellinia_texas@dlsu.edu.ph", true));

export { labs, tables, users, reservations };