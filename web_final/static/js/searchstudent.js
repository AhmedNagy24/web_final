function serachForNames() {
    fetch('/get_data/')
        .then(response => response.json())
        .then(data => {
            const activeStudents = data.filter(student => student.status === 'active' || student.status === 'Active');
            const name = document.getElementById('search').value;
            let myStudents = activeStudents.filter(student => student.firstname.toLocaleLowerCase() === name.toLocaleLowerCase());
            console.log(name);
            const table = document.getElementById('student_data');
            if (myStudents.length === 0) {
                let msg = document.getElementById('message');
                msg.removeAttribute("hidden");
                msg.style.backgroundColor = 'red';
                msg.append("Student is not found");
                setTimeout(function () {
                    msg.innerHTML = '';
                    msg.setAttribute('hidden', 'true');
                }, 3000);
            } else {
                myStudents.forEach(student => {
                        shownName = student.firstname + " " + student.lastname;
                        shownID = student.id;
                        shownLevel = student.level;
                        shownEmail = student.email;
                        shownGPA = student.GPA;
                        shownStatus = student.status;
                        shownGender = student.gender;
                        shownDEP = student.department;
                        shownPhone = student.phone;
                        nameTD = document.createElement('td');
                        nameTD.innerHTML = shownName;
                        idTD = document.createElement('td');
                        idTD.innerHTML = shownID;
                        levelTD = document.createElement('td');
                        levelTD.innerHTML = shownLevel;
                        emailTD = document.createElement('td');
                        emailTD.innerHTML = shownEmail;
                        gpaTD = document.createElement('td');
                        gpaTD.innerHTML = shownGPA;
                        statusTD = document.createElement('td');
                        statusTD.innerHTML = shownStatus;
                        genderTD = document.createElement('td');
                        genderTD.innerHTML = shownGender;
                        depTD = document.createElement('td');
                        depTD.innerHTML = shownDEP;
                        phoneTD = document.createElement('td');
                        phoneTD.innerHTML = shownPhone;
                        tr = document.createElement('tr');
                        tr.appendChild(nameTD);
                        tr.appendChild(idTD);
                        tr.appendChild(levelTD);
                        tr.appendChild(emailTD);
                        tr.appendChild(gpaTD);
                        tr.appendChild(statusTD);
                        tr.appendChild(genderTD);
                        tr.appendChild(depTD);
                        tr.appendChild(phoneTD);
                        table.appendChild(tr);
                    }
                );
            }
        });
}

function deleteTD() {
    const table = document.getElementById('student_data');
    table.remove();
    const newTable = document.createElement('tbody');
    newTable.setAttribute('id', 'student_data');
    let tab = document.getElementById('data');
    tab.append(newTable);
}

const btn = document.getElementById('search_button');
btn.addEventListener("click", (x) => {
    x.preventDefault();
    deleteTD();
    serachForNames();
});