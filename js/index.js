import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, deleteDoc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";

// initialize firebase
const firebaseConfig = {
    apiKey: "AIzaSyDHZpy8FJM8lUmUSv_gXqKoPvzpVVeHu5g",
    authDomain: "content-management-syste-52d17.firebaseapp.com",
    projectId: "content-management-syste-52d17",
    storageBucket: "content-management-syste-52d17.appspot.com",
    messagingSenderId: "34275485596",
    appId: "1:34275485596:web:3f5151a2d8d75cea330a59",
    measurementId: "G-JLWDPQBSPK"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var months = [
    "ianuarie", "februarie", "martie", "aprilie", "mai",
    "iunie", "iulie", "august", "septembrie", "octombrie",
    "noiembrie", "decembrie"
];  
var table = document.getElementById("tabelAngajati");

// get all data from firebase
async function getAllData() {
    const querySnapshot = await getDocs(collection(db, "employees"));
    putData(querySnapshot);
    setEventListenerDelete();
}
getAllData();

// put the data in the table
function putData(querySnapshot) {
    var j = 1;
    querySnapshot.forEach((doc) => {
        var row= table.insertRow(j);
        row.id = doc.data()["nume"]+"row";
        var cellNume = row.insertCell();
        cellNume.setAttribute("class", "td-paddings");
        cellNume.innerHTML = `<div id="icon-name"><img src="./images/${doc.data()["poza"]}"  class="imageEmployee"/><p> ${doc.data()["nume"]}</p></div>`;
        var cellPrenume = row.insertCell();
        cellPrenume.setAttribute("class", "td-paddings");
        cellPrenume.innerHTML = doc.data()["prenume"];
        var cellEmail = row.insertCell();
        cellEmail.setAttribute("class", "td-paddings");
        cellEmail.innerHTML = doc.data()["email"];
        var cellSex = row.insertCell();
        cellSex.setAttribute("class", "td-paddings");
        cellSex.innerHTML = doc.data()["sex"];
        var cellDataNasterii = row.insertCell();
        cellDataNasterii.setAttribute("class", "td-paddings");
        var data_nasterii = doc.data()["data_nasterii"];
        var month = data_nasterii.split("-")[1];
        var indexMonth;
        if(month[0] === "0") {
            indexMonth = month.split("0")[1]-1;
        } else {
            indexMonth = month-1;
        }
        var birthDate = data_nasterii.split("-")[2] + " " + months[indexMonth] + " " + data_nasterii.split("-")[0];
        cellDataNasterii.innerHTML = birthDate;
        var cellDelete = row.insertCell();
        cellDelete.innerHTML = `<img src="./images/x.png" class="recycleBin" id="${doc.data()["nume"]}"/>`;
        j++;
    });
}

// remove the data from the table
function removeData(table) {
    for (var i = table.childNodes[1].childElementCount-1; i >0; i--) {
        table.deleteRow(i);
    }
}

// set the delete for every employee
function setEventListenerDelete(){
    var drop = document.getElementsByClassName('recycleBin');
    for (var i = 0; i < drop.length; i++) {
        drop[i].addEventListener("click", function() {
            deleteDoc(doc(db, "employees", this.id));
            document.getElementById(`${this.id}row`).remove();
        });
    }
}

// add an employee
document.getElementById("submitButton").addEventListener("click", function() {    
    var numeV = document.getElementById("nume").value;
    var prenumeV = document.getElementById("prenume").value;
    var emailV = document.getElementById("email").value;
    var sexV = document.getElementById("sex").value;
    var dataNasteriiV = document.getElementById("dataNasterii").value;
    var pozaV = document.getElementById("poza").value;
    var poza_angajat;
    if(pozaV != "") {
        poza_angajat = pozaV.split("\\")[2];
    } else {
        poza_angajat = "noPic.jpg";
    }
    if(numeV == "") {
        alert("Completati numele");
    } else {
        if(prenumeV == "") {
            alert("Completati prenumele");
        } else {
            if(emailV == "") {
                alert("Completati email-ul");
            } else {
                if(validateEmail(emailV)) {
                    if(sexV == "-") {
                        alert("Alegeti sex-ul");
                    } else {
                        if(dataNasteriiV == "") {
                            alert("Alegeti data nasterii");
                        } else {
                            var birthDate = new Date(dataNasteriiV);
                            var month_diff = Date.now() - birthDate.getTime();  
                            var age_dt = new Date(month_diff);   
                            var year = age_dt.getUTCFullYear();  
                            var age = Math.abs(year - 1970); 
                            if(age >= 16) {
                                setDoc(doc(db, "employees", `${numeV}`), {
                                    nume: numeV,
                                    prenume: prenumeV,
                                    email: emailV,
                                    sex: sexV,
                                    data_nasterii: dataNasteriiV,
                                    poza: poza_angajat
                                });
                                document.getElementById("nume").value = "";
                                document.getElementById("prenume").value = "";
                                document.getElementById("email").value = "";
                                document.getElementById("sex").value = "";
                                document.getElementById("dataNasterii").value = "";
                                document.getElementById("poza").value = "";
                                removeData(table);
                                getAllData();
                            } else {
                                alert("Varsta trebuie sa fie mai mare sau egala cu 16");
                            }
                        }
                    }
                } else {
                    alert("Introduceti o adresa de email valida");
                }
            }
        }
    }
});

// event listener for the search bar (filter by name)
document.getElementById("imgSearch").addEventListener("click", async function() {
    var searchString = document.getElementById("query").value;
    removeData(table);
    const q = query(collection(db, "employees"), where("nume", "==", searchString));
    const querySnapshot = await getDocs(q);
    putData(querySnapshot);
});

// function to validate email with regex
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// clear data from search bar
document.getElementById("query").addEventListener("change", function() {
    if(document.getElementById("query").value == "") {
        removeData(table);
        getAllData();
    }
});

// sortare dupa nume
document.getElementById("selectSort").addEventListener("change", async function() {
    var sortValue = document.getElementById("selectSort").value;
    if(sortValue == "nume") {
        removeData(table);
        const q = query(collection(db, "employees"), orderBy("nume", "desc"));
        const querySnapshot = await getDocs(q);
        putData(querySnapshot);

    } else if(sortValue == "data-nasterii-asc") {
        removeData(table);
        const q = query(collection(db, "employees"));
        const querySnapshot = await getDocs(q);
        var momentDates = [];
        var j = 0;
        querySnapshot.forEach((doc) => {
            var data = doc.data()["data_nasterii"];
            momentDates[j] = new Date(data.split("-")[0], data.split("-")[1], data.split("-")[2]);
            j++;
        });         
        var sortByDateAsc = function (lhs, rhs)  { return lhs > rhs ? 1 : lhs < rhs ? -1 : 0; };
        momentDates.sort(sortByDateAsc);
        var querySnapshot2;
        for(var i=momentDates.length-1; i>=0;i--){
            var year = momentDates[i].getUTCFullYear();
            var month;
            var day;
            if( momentDates[i].getDate() <10){
                day = "0" + momentDates[i].getDate();
            } else {
                day = momentDates[i].getDate();
            }
            if( momentDates[i].getMonth() <10){
                month = "0" + momentDates[i].getDate();
            } else {
                month = momentDates[i].getMonth();
            }
            var dataFormat = year + "-" + month + "-" + day;
            const q = query(collection(db, "employees"), where("data_nasterii", "==", dataFormat));
            querySnapshot2 = await getDocs(q);
            putData(querySnapshot2);
        }

    } else if(sortValue == "data-nasterii-desc") {
        removeData(table);
        const q = query(collection(db, "employees"));
        const querySnapshot = await getDocs(q);
        var momentDates = [];
        var j = 0;
        querySnapshot.forEach((doc) => {
            var data = doc.data()["data_nasterii"];
            momentDates[j] = new Date(data.split("-")[0], data.split("-")[1], data.split("-")[2]);
            j++;
        });       
        var sortByDateDesc = function (lhs, rhs) { return lhs < rhs ? 1 : lhs > rhs ? -1 : 0; };
        momentDates.sort(sortByDateDesc);
        var querySnapshot2;
        for(var i=momentDates.length-1; i>=0;i--){
            var year = momentDates[i].getUTCFullYear();
            var month;
            var day;
            if( momentDates[i].getDate() <10){
                day = "0" + momentDates[i].getDate();
            } else {
                day = momentDates[i].getDate();
            }
            if( momentDates[i].getMonth() <10){
                month = "0" + momentDates[i].getDate();
            } else {
                month = momentDates[i].getMonth();
            }
            var dataFormat = year + "-" + month + "-" + day;
            const q = query(collection(db, "employees"), where("data_nasterii", "==", dataFormat));
            querySnapshot2 = await getDocs(q);
            putData(querySnapshot2);
        }
    }else {
        removeData(table);
        getAllData();
    }
});

// filter by sex
document.getElementById("filterBySex").addEventListener("change", async function() {
    var filterValue = document.getElementById("filterBySex").value;
    if(filterValue == "feminin") {
        removeData(table);
        const q = query(collection(db, "employees"), where("sex", "==", "feminin"));
        const querySnapshot = await getDocs(q);
        putData(querySnapshot);
    } else if(filterValue == "masculin") {
        removeData(table);
        const q = query(collection(db, "employees"), where("sex", "==", "masculin"));
        const querySnapshot = await getDocs(q);
        putData(querySnapshot);
    } else {
        removeData(table);
        getAllData();
    }
});

// filter by picture
document.getElementById("filterByPicture").addEventListener("change", async function() {
    var filterValue = document.getElementById("filterByPicture").value;
    if(filterValue == "nu are") {
        removeData(table);
        const q = query(collection(db, "employees"), where("poza", "==", "noPic.jpg"));
        const querySnapshot = await getDocs(q);
        putData(querySnapshot);
    } else if(filterValue == "are") {
        removeData(table);
        const q = query(collection(db, "employees"), where("poza", "!=", "noPic.jpg"));
        const querySnapshot = await getDocs(q);
        putData(querySnapshot);
    } else {
        removeData(table);
        getAllData();
    }
});

// filter by birth date
document.getElementById("filterButton").addEventListener("click", async function(){
    var startValue = document.getElementById("start-date").value;
    var endValue = document.getElementById("end-date").value;
    if(startValue == "" || endValue == ""){
        alert("Trebuie sa alegi atat o data de inceput cat si una de sfarsit");
    }else{
        var startValue = document.getElementById("start-date").value;
        var startDate = new Date(startValue.split("-")[0], startValue.split("-")[1], startValue.split("-")[2]);
        var endValue = document.getElementById("end-date").value;
        var endDate = new Date(endValue.split("-")[0], endValue.split("-")[1], endValue.split("-")[2])
        removeData(table);
        const queryS = await getDocs(collection(db, "employees"));
        var j=1;
        queryS.forEach((doc) =>{
            var birthDate = doc.data()["data_nasterii"];
            var year = birthDate.split("-")[0];
            var month = birthDate.split("-")[1];
            var day = birthDate.split("-")[2];
            var date = new Date(year, month, day);
            if(date<=endDate && date>=startDate){
                var row= table.insertRow(j);
                row.id = doc.data()["nume"]+"row";
                var cellNume = row.insertCell();
                cellNume.setAttribute("class", "td-paddings");
                cellNume.innerHTML = `<div id="icon-name"><img src="./images/${doc.data()["poza"]}"  class="imageEmployee"/><p> ${doc.data()["nume"]}</p></div>`;
                var cellPrenume = row.insertCell();
                cellPrenume.setAttribute("class", "td-paddings");
                cellPrenume.innerHTML = doc.data()["prenume"];
                var cellEmail = row.insertCell();
                cellEmail.setAttribute("class", "td-paddings");
                cellEmail.innerHTML = doc.data()["email"];
                var cellSex = row.insertCell();
                cellSex.setAttribute("class", "td-paddings");
                cellSex.innerHTML = doc.data()["sex"];
                var cellDataNasterii = row.insertCell();
                cellDataNasterii.setAttribute("class", "td-paddings");
                var data_nasterii = doc.data()["data_nasterii"];
                var month = data_nasterii.split("-")[1];
                var indexMonth;
                if(month[0] === "0") {
                    indexMonth = month.split("0")[1]-1;
                } else {
                    indexMonth = month-1;
                }
                var birthDate = data_nasterii.split("-")[2] + " " + months[indexMonth] + " " + data_nasterii.split("-")[0];
                cellDataNasterii.innerHTML = birthDate;
                var cellDelete = row.insertCell();
                cellDelete.innerHTML = `<img src="./images/x.png" class="recycleBin" id="${doc.data()["nume"]}"/>`;
                j++;
            }
        });
    }
});

document.getElementById("formFilterDate").addEventListener("change", function(){
    var startValue = document.getElementById("start-date").value;
    var endValue = document.getElementById("end-date").value;
    if(startValue == "" && endValue == ""){
        removeData(table);
        getAllData();
    }
});