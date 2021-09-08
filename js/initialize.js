import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import {getFirestore, doc, setDoc, getDoc, getDocs, collection} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";

var j;
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

const querySnapshot = await getDocs(collection(db, "employees"));

function getAllData(){
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data()["data_nasterii"]);
      var table = document.getElementById("tabelAngajati");
      var j=1;
      var row= table.insertRow(j);
      row.id = doc.data()["nume"]+"row";
      var cellNume = row.insertCell();
      cellNume.setAttribute("class", "td-paddings");
      cellNume.innerHTML = `<div id="icon-name"><img src="./images/search.png"  id="imageEmployee"/><p id="nameEmployee"> ${doc.data()["nume"]}</p></div>`;
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
      cellDataNasterii.innerHTML = data_nasterii;
      var cellDelete = row.insertCell();
      cellDelete.innerHTML = `<img src="./images/x.png" class="recycleBin" onclick="return deleteEmployee(this,event)" id="${doc.data()["nume"]}"/>`;
      j++;
    });
}
getAllData();


  document.getElementById("submitButton").addEventListener("click", function(){
    var numeV = document.getElementById("nume").value;
    var prenumeV = document.getElementById("prenume").value;
    var emailV = document.getElementById("email").value;
    var sexV = document.getElementById("sex").value;
    var dataNasteriiV = document.getElementById("dataNasterii").value
    console.log("Inserted");
  setDoc(doc(db, "test4", "new"), {
      nume: numeV,
      prenume: prenumeV,
      email: emailV,
      sex: sexV,
      data_nasterii: dataNasteriiV
 });
 console.log("Inserted");
  })

var months = [
    "ianuarie", "februarie", "martie", "aprilie", "mai",
    "iunie", "iulie", "august", "septembrie", "octombrie",
    "noiembrie", "decembrie"
];

function validateEmail(email) 
{
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
}

document.getElementById("body").addEventListener("load", function()
{
   console.log(docSnap);
});

// document.getElementById("submitButton").addEventListener("click",function(event)
// {
//     var arrayEmployee = [];
//     var nume = document.getElementById("nume").value;
//     var prenume = document.getElementById("prenume").value;
//     var email = document.getElementById("email").value;    
//     var sex = document.getElementById("sex").value;
//     var data_nasterii = document.getElementById("dataNasterii").value;    
//     var poza_angajat = document.getElementById("poza").value;
//     if(nume=="")
//     {
//         alert("Completati numele");
//         event.preventDefault;

//     return false;
//     }else
//     {
//         arrayEmployee[0] = nume;
//         if(prenume=="")
//         {
//             alert("Completati prenumele");
//             event.preventDefault;

//     return false;
//         }else
//         {
//             arrayEmployee[1] = prenume;
//             if(email=="")
//             {
//                 alert("Completati email-ul");
//                 event.preventDefault;

//     return false;
//             }else
//             {
//                 if(validateEmail(email))
//                 {
//                     arrayEmployee[2] = email;
//                     if(sex=="-")
//                     {
//                        alert("Alegeti sex-ul");
//                        event.preventDefault();
//                     }else{
//                        var sexValue;
//                         if(sex == "f")
//                         {
//                           sexValue="feminin";
//                         }else
//                         {
//                           sexValue="masculin";
//                         }
//                         arrayEmployee[3] = sexValue;
//                         if(data_nasterii=="")
//                         {
//                           alert("Alegeti data nasterii");
//                           event.preventDefault;

//     return false;
//                         }else
//                         {
//                             var birthDate = new Date(data_nasterii);
//                             var month_diff = Date.now() - birthDate.getTime();  
//                             var age_dt = new Date(month_diff);   
//                             var year = age_dt.getUTCFullYear();  
//                             var age = Math.abs(year - 1970); 
//                             if(age>=16)
//                             {
//                                 arrayEmployee[4] = data_nasterii;
//                                     arrayEmployee[5] = poza_angajat.split("\\")[2];
//                                     callWrite();
//                                     var archive;
//                                     var table = document.getElementById("tabelAngajati");
//                                     archive= localStorage.getItem(`${nume}`);
//                                     var arrayEmployee =  archive.split(",");
//                                     var row= table.insertRow(localStorage.length);
//                                     row.id = arrayEmployee[0]+"row";
//                                     var cellNume = row.insertCell();
//                                     cellNume.setAttribute("class", "td-paddings");
//                                     cellNume.innerHTML = `<div id="icon-name"><img src="./images/${arrayEmployee[5]}" id="imageEmployee"/><p id="nameEmployee"> ${arrayEmployee[0]}</p></div>`;
//                                     var cellPrenume = row.insertCell();
//                                     cellPrenume.setAttribute("class", "td-paddings");
//                                     cellPrenume.innerHTML = arrayEmployee[1];
//                                     var cellEmail = row.insertCell();
//                                     cellEmail.setAttribute("class", "td-paddings");
//                                     cellEmail.innerHTML = arrayEmployee[2];
//                                     var cellSex = row.insertCell();
//                                     cellSex.setAttribute("class", "td-paddings");
//                                     cellSex.innerHTML = arrayEmployee[3];
//                                     var cellDataNasterii = row.insertCell();
//                                     cellDataNasterii.setAttribute("class", "td-paddings");
//                                     var data_nasterii = arrayEmployee[4];
//             var month = data_nasterii.split("-")[1];
//             var indexMonth;
//             if(month[0]==="0"){
//                 indexMonth = month.split("0")[1]-1;
//             }
//             else{
//                 indexMonth = month-1;
//             }
//             var birthDate = data_nasterii.split("-")[2] + " " + months[indexMonth] + " " + data_nasterii.split("-")[0];
//             cellDataNasterii.innerHTML = birthDate;
//                                     var cellDelete = row.insertCell();
//                                     cellDelete.innerHTML = `<img src="./images/x.png" class="recycleBin" onclick="return deleteEmployee(this,event) id="${arrayEmployee[0]}"/>`;
//                                     j++;
//                             }else
//                             {
//                                 alert("Introduceti o data de nastere valida");
//                                event.preventDefault;

//     return false;
//                             }
//                         }
//                     }
//                 }else
//                 {
//                     alert("Introduceti o adresa de email valida!");
//                     event.preventDefault;

//     return false;
//                 }
//             }
//         }
//     }
// });