import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import {getFirestore, doc, setDoc, getDoc, getDocs, collection, deleteDoc, query, where, orderBy} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";

//initialize firebase
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

//get all data from firebase
async function getAllData(){
    var j=1;
    const querySnapshot = await getDocs(collection(db, "employees"));
    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data()["data_nasterii"]);
    var table = document.getElementById("tabelAngajati");
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
    var month = data_nasterii.split("-")[1];
    var indexMonth;
    if(month[0]==="0"){
        indexMonth = month.split("0")[1]-1;
    }
    else{
        indexMonth = month-1;
    }
    var birthDate = data_nasterii.split("-")[2] + " " + months[indexMonth] + " " + data_nasterii.split("-")[0];
    cellDataNasterii.innerHTML = birthDate;
    var cellDelete = row.insertCell();
    cellDelete.innerHTML = `<img src="./images/x.png" class="recycleBin" id="${doc.data()["nume"]}"/>`;
    j++;
    });
    //set the delete for every employee
    var drop = document.getElementsByClassName('recycleBin');
    for (var i = 0; i < drop.length; i++){
        drop[i].addEventListener("click", function(){
            deleteDoc(doc(db, "employees", this.id));
            document.getElementById(`${this.id}row`).remove();
    });
    }
}
getAllData();

//add an employee
document.getElementById("submitButton").addEventListener("click", function(){    
    var table = document.getElementById("tabelAngajati");
    var numeV = document.getElementById("nume").value;
    var prenumeV = document.getElementById("prenume").value;
    var emailV = document.getElementById("email").value;
    var sexV = document.getElementById("sex").value;
    var dataNasteriiV = document.getElementById("dataNasterii").value
    
    if(numeV==""){
        alert("Completati numele");
    }else{
        if(prenumeV=="")
        {
            alert("Completati prenumele");
        }else
        {
            if(emailV=="")
            {
                alert("Completati email-ul");
            }else
            {
                if(validateEmail(emailV))
                {
                    if(sexV=="-")
                    {
                        alert("Alegeti sex-ul");
                    }else{
                        if(dataNasteriiV=="")
                        {
                            alert("Alegeti data nasterii");
                        }else
                        {
                            var birthDate = new Date(dataNasteriiV);
                            var month_diff = Date.now() - birthDate.getTime();  
                            var age_dt = new Date(month_diff);   
                            var year = age_dt.getUTCFullYear();  
                            var age = Math.abs(year - 1970); 
                            if(age>=16)
                            {
                                setDoc(doc(db, "employees", `${numeV}`), {
                                    nume: numeV,
                                    prenume: prenumeV,
                                    email: emailV,
                                    sex: sexV,
                                    data_nasterii: dataNasteriiV
                                });
                                document.getElementById("nume").value = "";
                                document.getElementById("prenume").value = "";
                                document.getElementById("email").value = "";
                                document.getElementById("sex").value = "";
                                document.getElementById("dataNasterii").value = "";
                                document.getElementById("poza").value = "";
                                for (var i = table.childNodes[1].childElementCount-1; i >0; i--) 
                                {
                                    table.deleteRow(i);
                                }
                                getAllData();
                            }else{
                                alert("Varsta trebuie sa fie mai mare sau egala cu 16");
                            }
                        }
                    }
                }else{
                    alert("Introduceti o adresa de email valida");
                }
            }
        }
    }
  });

  document.getElementById("imgSearch").addEventListener("click", async function(){
    var searchString = document.getElementById("query").value;
    var table = document.getElementById("tabelAngajati");
    for (var i = table.childNodes[1].childElementCount-1; i >0; i--) 
    {
        table.deleteRow(i);
    }
    var j=1;

    const q = query(collection(db, "employees"), where("nume", "==", searchString));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
            var table = document.getElementById("tabelAngajati");
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
            var month = data_nasterii.split("-")[1];
            var indexMonth;
            if(month[0]==="0"){
                indexMonth = month.split("0")[1]-1;
            }
            else{
                indexMonth = month-1;
            }
            var birthDate = data_nasterii.split("-")[2] + " " + months[indexMonth] + " " + data_nasterii.split("-")[0];
            cellDataNasterii.innerHTML = birthDate;
            var cellDelete = row.insertCell();
            cellDelete.innerHTML = `<img src="./images/x.png" class="recycleBin" id="${doc.data()["nume"]}"/>`;
  });
});

  function validateEmail(email) 
  {
          var re = /\S+@\S+\.\S+/;
          return re.test(email);
  }

  //clear data from search bar
  document.getElementById("query").addEventListener("change", function(){
      if(document.getElementById("query").value==""){
        var table = document.getElementById("tabelAngajati");
        for (var i = table.childNodes[1].childElementCount-1; i >0; i--) 
        {
            table.deleteRow(i);
        }
          getAllData();
      }
  })

//sortare dupa nume
document.getElementById("selectSort").addEventListener("change", async function(){
    var table = document.getElementById("tabelAngajati");
    var sortValue = document.getElementById("selectSort").value;
    if(sortValue=="nume") 
    {
        for (var i = table.childNodes[1].childElementCount-1; i >0; i--) 
        {
            table.deleteRow(i);
        }
        var j=1;
        const q = query(collection(db, "employees"), orderBy("nume", "asc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            var table = document.getElementById("tabelAngajati");
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
            var month = data_nasterii.split("-")[1];
            var indexMonth;
            if(month[0]==="0"){
                indexMonth = month.split("0")[1]-1;
            }
            else{
                indexMonth = month-1;
            }
            var birthDate = data_nasterii.split("-")[2] + " " + months[indexMonth] + " " + data_nasterii.split("-")[0];
            cellDataNasterii.innerHTML = birthDate;
            var cellDelete = row.insertCell();
            cellDelete.innerHTML = `<img src="./images/x.png" class="recycleBin" id="${doc.data()["nume"]}"/>`;
  });
    }else if(sortValue.value=="data-nasterii")
    {
    }else
    {
        for (var i = table.childNodes[1].childElementCount-1; i >0; i--) 
        {
            table.deleteRow(i);
        }
        getAllData();
    }
});