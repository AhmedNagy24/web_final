function search_to_assign() {
    let students = JSON.parse(localStorage.getItem("allActiveStudents")) || [];
    let id = document.getElementById("search_bar_assign").value;
    for (let i = 0; i < students.length; i++) {
        if (students[i].sID === id && students[i].sLevel > 2) {
            if (students[i].sGpa >= 3) {
                document.getElementById("dept").removeAttribute("hidden");
                document.getElementById("1St").removeAttribute("hidden");
                document.getElementById("2Nd").removeAttribute("hidden");
                document.getElementById("3Rd").removeAttribute("hidden");
                document.getElementById("4Th").removeAttribute("hidden");
                document.getElementById("5Th").removeAttribute("hidden");
                break;
            } else if (students[i].sGpa >= 2.7) {
                document.getElementById("dept").removeAttribute("hidden");
                document.getElementById("1St").removeAttribute("hidden");
                document.getElementById("5Th").removeAttribute("hidden");
                document.getElementById("3Rd").removeAttribute("hidden");
                document.getElementById("4Th").removeAttribute("hidden");
                break;
            } else if (students[i].sGpa >= 2.5) {
                document.getElementById("dept").removeAttribute("hidden");
                document.getElementById("1St").removeAttribute("hidden");
                document.getElementById("5Th").removeAttribute("hidden");
                document.getElementById("4Th").removeAttribute("hidden");
                break;
            } else if (students[i].sGpa >= 2.2) {
                document.getElementById("dept").removeAttribute("hidden");
                document.getElementById("4Th").removeAttribute("hidden");
                document.getElementById("5Th").removeAttribute("hidden");
                break;
            } else if (students[i].sGpa >= 2) {
                document.getElementById("dept").removeAttribute("hidden");
                document.getElementById("5Th").removeAttribute("hidden");
                break;
            } else {
                let msg = document.getElementById('message');
                msg.style.backgroundColor = "red";
                msg.removeAttribute("hidden");
                msg.append("Student GPA is too low to be assigned to a department");
                setTimeout(function () {
                    msg.innerHTML = '';
                    msg.setAttribute('hidden', 'true');
                }, 5000);
                break;
            }
        } else if (students[i].sID === id && students[i].sLevel < 3) {
            let msg = document.getElementById('message');
            msg.style.backgroundColor = "red";
            msg.removeAttribute("hidden");
            msg.append("Student is not eligible to be assigned to a department because his level is less than 3");
            setTimeout(function () {
                msg.innerHTML = '';
                msg.setAttribute('hidden', 'true');
            }, 5000);
            break;
        }
    }

}

let body;

function search_results() {
    let check = true;
    let students = JSON.parse(localStorage.getItem("allActiveStudents")) || [];
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let id = document.getElementById("search_bar_assign").value;
    for (let i = 0; i < students.length; i++) {
        if (students[i].sID === id) {
            td1.innerHTML = students[i].firstName + " " + students[i].lastName;
            td2.innerHTML = students[i].sGpa;
            td3.innerHTML = students[i].sStatus;
            td4.innerHTML = students[i].sID;
            td5.innerHTML = students[i].sDepartment
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            let z = document.getElementById('student_data');
            z.append(tr);
            body = tr;
            check = false;
        }
    }
    if (check) {
        let msg = document.getElementById('message');
        msg.style.backgroundColor = "red";
        msg.removeAttribute("hidden");
        msg.style.backgroundColor = "red";
        msg.append("Student is not found");
        setTimeout(function () {
            msg.innerHTML = '';
            msg.setAttribute('hidden', 'true');
        }, 5000);
    }
}

const searchBtn1 = document.getElementById("search_button_assign");
searchBtn1.addEventListener("click", (x) => {
    x.preventDefault();
    x.stopPropagation();
    search_results();
    search_to_assign();
});
const searchBtn2 = document.getElementById("search_bar_assign");
searchBtn2.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        search_results();
        search_to_assign();
    }
});


function assignDept() {
    let students = JSON.parse(localStorage.getItem("allActiveStudents")) || [];
    let id = document.getElementById("search_bar_assign").value;
    let department = document.getElementById("dept").value;
    for (let i = 0; i < students.length; i++) {
        if (students[i].sID === id && students[i].sStatus === "active" && students[i].sLevel >= 3) {
            if (department === "CS") {
                students[i].sDepartment = department;
                localStorage.setItem("allActiveStudents", JSON.stringify(students));
                let msg = document.getElementById('message');
                msg.removeAttribute("hidden");
                msg.style.backgroundColor = "green";
                msg.append("Student added successfully to Computer Science!");
                setTimeout(function () {
                    msg.innerHTML = '';
                    msg.setAttribute('hidden', 'true');
                }, 5000);
                break;
            } else if (department === "IS") {
                students[i].sDepartment = department;
                localStorage.setItem("allActiveStudents", JSON.stringify(students));
                let msg = document.getElementById('message');
                msg.removeAttribute("hidden");
                msg.append("Student added successfully to Information Systems!");
                msg.style.backgroundColor = "green";
                setTimeout(function () {
                    msg.innerHTML = '';
                    msg.setAttribute('hidden', 'true');
                }, 5000);
                break;
            } else if (department === "AI") {
                students[i].sDepartment = department;
                localStorage.setItem("allActiveStudents", JSON.stringify(students));
                let msg = document.getElementById('message');
                msg.removeAttribute("hidden");
                msg.append("Student added successfully to Artificial Intelligence !");
                msg.style.backgroundColor = "green";
                setTimeout(function () {
                    msg.innerHTML = '';
                    msg.setAttribute('hidden', 'true');
                }, 5000);
                break;
            } else if (department === "IT") {
                students[i].sDepartment = department;
                localStorage.setItem("allActiveStudents", JSON.stringify(students));
                let msg = document.getElementById('message');
                msg.removeAttribute("hidden");
                msg.append("Student added successfully to Information Technology!");
                msg.style.backgroundColor = "green";
                setTimeout(function () {
                    msg.innerHTML = '';
                    msg.setAttribute('hidden', 'true');
                }, 5000);
                break;
            } else if (department === "DS") {
                students[i].sDepartment = department;
                localStorage.setItem("allActiveStudents", JSON.stringify(students));
                let msg = document.getElementById('message');
                msg.removeAttribute("hidden");
                msg.append("Student added successfully to Decision Support!");
                msg.style.backgroundColor = "green";
                setTimeout(function () {
                    msg.innerHTML = '';
                    msg.setAttribute('hidden', 'true');
                }, 5000);
                break;
            }
        }
    }

    let x = document.getElementById("student_data");
    x.remove();
    let y = document.createElement("tbody");
    y.id = "student_data";
    let z = document.getElementById('data');
    z.appendChild(y);

}

const assignBtn = document.getElementById("submit_button");
assignBtn.addEventListener("click", (x) => {
    x.preventDefault();
    x.stopPropagation();
    assignDept();
});