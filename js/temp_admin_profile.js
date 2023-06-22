// Hardcoded Values
let reservations = [
    {
        res_code: "R#10104",
        room: "G304",
        seat: "010",
        requested: "2023-6-19",
        reserved: "2023-6-23",
        start: "20", 
        end: "26" 
    },
    {
        res_code: "R#10105",
        room: "G304",
        seat: "010",
        requested: "2023-6-19",
        reserved: "2023-6-24",
        start: "20",
        end: "26"
    },
    {
        res_code: "R#10104",
        room: "G304",
        seat: "010",
        requested: "2023-6-19",
        reserved: "2023-6-25",  
        start: "20", 
        end: "26"
    },
    {
        res_code: "R#10104",
        room: "G304",
        seat: "010",
        requested: "2023-6-19",
        reserved: "2023-6-25",  
        start: "20", 
        end: "26"
    },
    {
        res_code: "R#10104",
        room: "G304",
        seat: "010",
        requested: "2023-6-19",
        reserved: "2023-6-25",  
        start: "20", 
        end: "26"
    },
    {
        res_code: "R#10104",
        room: "G304",
        seat: "010",
        requested: "2023-6-19",
        reserved: "2023-6-25",  
        start: "20", 
        end: "26"
    }
];

// Print Reservations
initializeViewResTable();
initializeDeleteResTable();

function initializeViewResTable() {
  //one reservation=1 row
  //one detail of reservation=1col
    let insert = "";
    const table = document.getElementById("viewTable");
    
    for (let i of reservations) {
        insert += "<tr>";
        for (const j in i) {
            insert += "<th>";
            //to print and format time
            if(j == "start" || j == "end"){
                let time = parseInt(i[j]);
                let morning = true;    
                let minutes = time % 2;
                time /= 2;
                time = Math.floor(time);

                if(time > 12){
                    time -= 12;
                    morning = false;
                }

                time = time.toString();

                if(minutes == 0){
                    time += ":00";
                }
                else{
                    time += ":30";
                }

                if(!morning){
                    time+="PM";
                }
                else{
                    time+="AM";
                }
                insert += time;
            }
            else{
                insert += i[j];    
            }

            insert+="</th>";
        }
        insert += `<th><a href="reserve.html"><img src = "../images/edit.png"> </a></th>`;
        insert += "</tr>";
    }
    table.innerHTML+=insert;
}

function initializeDeleteResTable() {
    //one reservation=1 row
    //one detail of reservation=1col
    let insert = "";
    const table = document.getElementById("deleteTable");
    
    for (let i of reservations) {
        insert += "<tr>";
        for (const j in i) {
            insert += "<th>";
            //to print and format time
            if(j == "start" || j == "end"){
                let time = parseInt(i[j]);
                let morning = true;    
                let minutes = time % 2;
                time /= 2;
                time = Math.floor(time);

                if(time > 12){
                    time -= 12;
                    morning = false;
                }

                time = time.toString();

                if(minutes == 0){
                    time += ":00";
                }
                else{
                    time += ":30";
                }

                if(!morning){
                    time+="PM";
                }
                else{
                    time+="AM";
                }
                insert += time;
            }
            else{
                insert += i[j];    
            }

            insert+="</th>";
        }
        insert += `<th><a href="reserve.html"><img src = "../images/delete.png"> </a></th>`;
        insert += "</tr>";
    }
    table.innerHTML+=insert;
}