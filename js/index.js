var j=1;
function loadData(){
    var archive = [];
    var table = document.getElementById("tabelAngajati");
    for (var i = 0; i<localStorage.length; i++) {
        archive[i] = localStorage.getItem(localStorage.key(i));
        var arrayEmployee =  archive[i].split(",");
        var row= table.insertRow(j);
        var cellNume = row.insertCell();
        cellNume.innerHTML = arrayEmployee[0];
        var cellPrenume = row.insertCell();
        cellPrenume.innerHTML = arrayEmployee[1];
        var cellEmail = row.insertCell();
        cellEmail.innerHTML = arrayEmployee[2];
        var cellSex = row.insertCell();
        cellSex.innerHTML = arrayEmployee[3];
        var cellDataNasterii = row.insertCell();
        cellDataNasterii.innerHTML = arrayEmployee[4];
        var cellPozaAngajat = row.insertCell();
        cellPozaAngajat.innerHTML = `<img src="./images/${arrayEmployee[5]}" />`;
        var cellDelete = row.insertCell();
        cellDelete.innerHTML = '<img src="./images/recycle-bin.png" class="recycleBin"/>';
        j++;
    }
}

function Add_Employee(){
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
    var validari=0;
    if(nume==""){
        alert("Completati numele");
    }else{
        arrayEmployee[0] = nume;
        if(prenume==""){
            alert("Completati prenumele");
        }else{
            arrayEmployee[1] = prenume;
            if(email==""){
                alert("Completati email-ul");
            }else{
                if(validateEmail(email)){
                    arrayEmployee[2] = email;
                    if(sex=="-"){
                       alert("Alegeti sex-ul");
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
                                        archive= localStorage.getItem(localStorage.getItem(`${nume}`));
                                        var arrayEmployee =  archive.split(",");
                                        var row= table.insertRow(localStorage.length+1);
                                        var cellNume = row.insertCell();
                                        cellNume.innerHTML = arrayEmployee[0];
                                        var cellPrenume = row.insertCell();
                                        cellPrenume.innerHTML = arrayEmployee[1];
                                        var cellEmail = row.insertCell();
                                        cellEmail.innerHTML = arrayEmployee[2];
                                        var cellSex = row.insertCell();
                                        cellSex.innerHTML = arrayEmployee[3];
                                        var cellDataNasterii = row.insertCell();
                                        cellDataNasterii.innerHTML = arrayEmployee[4];
                                        var cellPozaAngajat = row.insertCell();
                                        cellPozaAngajat.innerHTML = `<img src="./images/${arrayEmployee[5]}" />`;
                                        var cellDelete = row.insertCell();
                                        cellDelete.innerHTML = '<img src="./images/recycle-bin.png" class="recycleBin"/>';
                                        j++;
                                }
                            }else{
                                alert("Introduceti o data de nastere valida");
                            }
                        }
                    }
                }else{
                    alert("Introduceti o adresa de email valida!");
                }
            }
        }
    }
}

function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

