function loadData(){
    var table = document.getElementById("tabelAngajati");
    var j=1;
    var archive = [];
    for (var i = 0; i<localStorage.length; i++) {
        archive[i] = localStorage.getItem(localStorage.key(i));
        var arrayEmployee =  archive[i].split(",");
        var row= table.insertRow(j);
        row.id = arrayEmployee[0]+"row";
        var cellNume = row.insertCell();
        cellNume.setAttribute("class", "td-paddings");
        cellNume.innerHTML = `<div id="icon-name"><img src="./images/${arrayEmployee[5]}"  id="imageEmployee"/><p id="nameEmployee"> ${arrayEmployee[0]}</p></div>`;
        var cellPrenume = row.insertCell();
        cellPrenume.setAttribute("class", "td-paddings");
        cellPrenume.innerHTML = arrayEmployee[1];
        var cellEmail = row.insertCell();
        cellEmail.setAttribute("class", "td-paddings");
        cellEmail.innerHTML = arrayEmployee[2];
        var cellSex = row.insertCell();
        cellSex.setAttribute("class", "td-paddings");
        cellSex.innerHTML = arrayEmployee[3];
        var cellDataNasterii = row.insertCell();
        cellDataNasterii.setAttribute("class", "td-paddings");
        cellDataNasterii.innerHTML = arrayEmployee[4];
        var cellDelete = row.insertCell();
        cellDelete.innerHTML = `<img src="./images/recycle-bin.png" class="recycleBin" onclick="return deleteEmployee(this,event)" id="${arrayEmployee[0]}"/>`;
        j++;
    }
}

function Add_Employee(event){
    var months = [
        "ianuarie", "februarie", "martie", "aprilie", "mai",
        "iunie", "iulie", "august", "septembrie", "octombrie",
        "noiembrie", "decembrie"
    ];
    var arrayEmployee = [];
    var nume = document.getElementById("nume").value;
    var prenume = document.getElementById("prenume").value;
    var email = document.getElementById("email").value;    
    var sex = document.getElementById("sex").value;
    var data_nasterii = document.getElementById("dataNasterii").value;    
    var poza_angajat = document.getElementById("poza").value;
    if(nume==""){
        alert("Completati numele");
        event.preventDefault();
    }else{
        arrayEmployee[0] = nume;
        if(prenume==""){
            alert("Completati prenumele");
            event.preventDefault();
        }else{
            arrayEmployee[1] = prenume;
            if(email==""){
                alert("Completati email-ul");
                event.preventDefault();
            }else{
                if(validateEmail(email)){
                    arrayEmployee[2] = email;
                    if(sex=="-"){
                       alert("Alegeti sex-ul");
                       event.preventDefault();
                    }else{
                       var sexValue;
                       if(sex == "f"){
                          sexValue="feminin";
                        }else{
                          sexValue="masculin";
                        }
                        arrayEmployee[3] = sexValue;
                        if(data_nasterii==""){
                          alert("Alegeti data nasterii");
                          event.preventDefault();
                        }else{
                            var birthDate = new Date(data_nasterii);
                            var month_diff = Date.now() - birthDate.getTime();  
                            var age_dt = new Date(month_diff);   
                            var year = age_dt.getUTCFullYear();  
                            var age = Math.abs(year - 1970); 
                            if(age>=16){
                                var month = data_nasterii.split("-")[1];
                                var birthDate = data_nasterii.split("-")[2] + " " + months[month.split("0")[1]-1] + " " + data_nasterii.split("-")[0];
                                arrayEmployee[4] = birthDate;
                                if(poza_angajat==""){
                                    alert("Alegeti poza");
                                }else{
                                    arrayEmployee[5] = poza_angajat.split("\\")[2];
                                    localStorage.setItem(`${nume}`, arrayEmployee); 
                                    var archive;
                                    var table = document.getElementById("tabelAngajati");
                                    archive= localStorage.getItem(`${nume}`);
                                    var arrayEmployee =  archive.split(",");
                                    var row= table.insertRow(localStorage.length);
                                    row.id = arrayEmployee[0]+"row";
                                    var cellNume = row.insertCell();
                                    cellNume.setAttribute("class", "td-paddings");
                                    cellNume.innerHTML = `<div id="icon-name"><img src="./images/${arrayEmployee[5]}" id="imageEmployee"/><p id="nameEmployee"> ${arrayEmployee[0]}</p></div>`;
                                    var cellPrenume = row.insertCell();
                                    cellPrenume.setAttribute("class", "td-paddings");
                                    cellPrenume.innerHTML = arrayEmployee[1];
                                    var cellEmail = row.insertCell();
                                    cellEmail.setAttribute("class", "td-paddings");
                                    cellEmail.innerHTML = arrayEmployee[2];
                                    var cellSex = row.insertCell();
                                    cellSex.setAttribute("class", "td-paddings");
                                    cellSex.innerHTML = arrayEmployee[3];
                                    var cellDataNasterii = row.insertCell();
                                    cellDataNasterii.setAttribute("class", "td-paddings");
                                    cellDataNasterii.innerHTML = arrayEmployee[4];
                                    var cellDelete = row.insertCell();
                                    cellDelete.innerHTML = `<img src="./images/recycle-bin.png" class="recycleBin" onclick="return deleteEmployee(this,event) id="${arrayEmployee[0]}"/>`;
                                    j++;
                                }
                            }else{
                                alert("Introduceti o data de nastere valida");
                                event.preventDefault();
                            }
                        }
                    }
                }else{
                    alert("Introduceti o adresa de email valida!");
                    event.preventDefault();
                }
            }
        }
    }
}

function filterSearchBar(event){
    var archive = [];
    var searchString = document.getElementById("query").value;
    var table = document.getElementById("tabelAngajati");
    for (var i = table.childNodes[1].childElementCount-1; i >0; i--) {
        table.deleteRow(i);
    }
    var j=1;
    for (var i = 0; i<localStorage.length; i++) {
        archive[i] = localStorage.getItem(localStorage.key(i));
        if(archive[i].match(searchString)){
            var arrayEmployee =  archive[i].split(",");
            var row= table.insertRow(j);
            row.id = arrayEmployee[0] +"row";
            var cellNume = row.insertCell();
            cellNume.setAttribute("class", "td-paddings");
            cellNume.innerHTML = `<div id="icon-name"><img src="./images/${arrayEmployee[5]}"  id="imageEmployee"/><p id="nameEmployee"> ${arrayEmployee[0]}</p></div>`;
            var cellPrenume = row.insertCell();
            cellPrenume.setAttribute("class", "td-paddings");
            cellPrenume.innerHTML = arrayEmployee[1];
            var cellEmail = row.insertCell();
            cellEmail.setAttribute("class", "td-paddings");
            cellEmail.innerHTML = arrayEmployee[2];
            var cellSex = row.insertCell();
            cellSex.setAttribute("class", "td-paddings");
            cellSex.innerHTML = arrayEmployee[3];
            var cellDataNasterii = row.insertCell();
            cellDataNasterii.setAttribute("class", "td-paddings");
            cellDataNasterii.innerHTML = arrayEmployee[4];
            var cellDelete = row.insertCell();
            cellDelete.innerHTML = `<img src="./images/recycle-bin.png" class="recycleBin" onclick="return deleteEmployee(this,event)" id="${arrayEmployee[0]}"/>`;
            j++;
        }
    }
    event.preventDefault();
}

function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

function deleteEmployee(emp,event){
    var deleteVar = emp.id;
    localStorage.removeItem(deleteVar);
    document.getElementById(`${deleteVar}row`).remove();
    event.preventDefault();
}

function sort(listSelect, event){
    if(listSelect.value=="nume"){
        var archive = [];
        var table = document.getElementById("tabelAngajati");
        for (var i = table.childNodes[1].childElementCount-1; i >0; i--) {
            table.deleteRow(i);
        }
        var j=1;
        for (var i = 0; i<localStorage.length; i++) {
            archive[i] = localStorage.key(i);
        }
        var sortArray=archive.sort();
    for (var i = 0; i<sortArray.length; i++) {
        var archiveAll = [];
        archiveAll[i] = localStorage.getItem(sortArray[i]);
            var arrayEmployee =  archiveAll[i].split(",");
            var row= table.insertRow(j);
            row.id = arrayEmployee[0] +"row";
            var cellNume = row.insertCell();
            cellNume.setAttribute("class", "td-paddings");
            cellNume.innerHTML = `<div id="icon-name"><img src="./images/${arrayEmployee[5]}"  id="imageEmployee"/><p id="nameEmployee"> ${arrayEmployee[0]}</p></div>`;
            var cellPrenume = row.insertCell();
            cellPrenume.setAttribute("class", "td-paddings");
            cellPrenume.innerHTML = arrayEmployee[1];
            var cellEmail = row.insertCell();
            cellEmail.setAttribute("class", "td-paddings");
            cellEmail.innerHTML = arrayEmployee[2];
            var cellSex = row.insertCell();
            cellSex.setAttribute("class", "td-paddings");
            cellSex.innerHTML = arrayEmployee[3];
            var cellDataNasterii = row.insertCell();
            cellDataNasterii.setAttribute("class", "td-paddings");
            cellDataNasterii.innerHTML = arrayEmployee[4];
            var cellDelete = row.insertCell();
            cellDelete.innerHTML = `<img src="./images/recycle-bin.png" class="recycleBin" onclick="return deleteEmployee(this,event)" id="${arrayEmployee[0]}"/>`;
            j++;
        }
        event.preventDefault();
    }else if(listSelect.value=="data-nasterii"){
        var archive = [];
        var table = document.getElementById("tabelAngajati");
        for (var i = table.childNodes[1].childElementCount-1; i >0; i--) {
            table.deleteRow(i);
        }
        var j=1;
        var archiveKeys =[];
        for (var i = 0; i<localStorage.length; i++) {
            archive[i] = localStorage.getItem(localStorage.key(i)).split(",")[4];
            archiveKeys[i]=localStorage.getItem(localStorage.key(i)).split(",")[0];
        }
        var sortArray=archive.sort();
        for (var i = 0; i<archiveKeys.length; i++) {
            var archiveAll = [];
            archiveAll[i] = localStorage.getItem(archiveKeys[i]);
            var arrayEmployee =  archiveAll[i].split(",");
            var row= table.insertRow(j);
            row.id = arrayEmployee[0] +"row";
            var cellNume = row.insertCell();
            cellNume.setAttribute("class", "td-paddings");
            cellNume.innerHTML = `<div id="icon-name"><img src="./images/${arrayEmployee[5]}"  id="imageEmployee"/><p id="nameEmployee"> ${arrayEmployee[0]}</p></div>`;
            var cellPrenume = row.insertCell();
            cellPrenume.setAttribute("class", "td-paddings");
            cellPrenume.innerHTML = arrayEmployee[1];
            var cellEmail = row.insertCell();
            cellEmail.setAttribute("class", "td-paddings");
            cellEmail.innerHTML = arrayEmployee[2];
            var cellSex = row.insertCell();
            cellSex.setAttribute("class", "td-paddings");
            cellSex.innerHTML = arrayEmployee[3];
            var cellDataNasterii = row.insertCell();
            cellDataNasterii.setAttribute("class", "td-paddings");
            cellDataNasterii.innerHTML = arrayEmployee[4];
            var cellDelete = row.insertCell();
            cellDelete.innerHTML = `<img src="./images/recycle-bin.png" class="recycleBin" onclick="return deleteEmployee(this,event)" id="${arrayEmployee[0]}"/>`;
            j++;
            }
        event.preventDefault();
    }else{
        var archive = [];
        var table = document.getElementById("tabelAngajati");
        for (var i = table.childNodes[1].childElementCount-1; i >0; i--) {
            table.deleteRow(i);
        }
        return loadData();
    }
}
