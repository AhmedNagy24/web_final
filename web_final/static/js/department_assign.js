function search_to_assign() {
    let inputID = document.getElementById("search_bar_assign").value;

    fetch('/get_data/')
        .then(response => response.json())
        .then(data => {
            let students = data.filter(student => student.status === 'active');
            let myStud = students.filter(student => student.id === inputID);
            let myLevel = myStud[0].level;
            let myGPA = myStud[0].GPA;
            if (myLevel > 2) {
                if (myGPA >= 3) {
                    document.getElementById("dept").removeAttribute("hidden");
                    document.getElementById("1St").removeAttribute("hidden");
                    document.getElementById("2Nd").removeAttribute("hidden");
                    document.getElementById("3Rd").removeAttribute("hidden");
                    document.getElementById("4Th").removeAttribute("hidden");
                    document.getElementById("5Th").removeAttribute("hidden");
                } else if (myGPA >= 2.7) {
                    document.getElementById("dept").removeAttribute("hidden");
                    document.getElementById("1St").removeAttribute("hidden");
                    document.getElementById("5Th").removeAttribute("hidden");
                    document.getElementById("3Rd").removeAttribute("hidden");
                    document.getElementById("4Th").removeAttribute("hidden");
                } else if (myGPA >= 2.5) {
                    document.getElementById("dept").removeAttribute("hidden");
                    document.getElementById("1St").removeAttribute("hidden");
                    document.getElementById("5Th").removeAttribute("hidden");
                    document.getElementById("4Th").removeAttribute("hidden");
                } else if (myGPA >= 2.2) {
                    document.getElementById("dept").removeAttribute("hidden");
                    document.getElementById("4Th").removeAttribute("hidden");
                    document.getElementById("5Th").removeAttribute("hidden");
                } else if (myGPA >= 2) {
                    document.getElementById("dept").removeAttribute("hidden");
                    document.getElementById("5Th").removeAttribute("hidden");
                } else {
                    let msg = document.getElementById('message');
                    msg.style.backgroundColor = "red";
                    msg.removeAttribute("hidden");
                    msg.append("Student GPA is too low to be assigned to a department");
                    setTimeout(function () {
                        msg.innerHTML = '';
                        msg.setAttribute('hidden', 'true');
                    }, 5000);
                }
            } else if (myLevel < 3) {
                let msg = document.getElementById('message');
                msg.style.backgroundColor = "red";
                msg.removeAttribute("hidden");
                msg.append("Student is not eligible to be assigned to a department because his level is less than 3");
                setTimeout(function () {
                    msg.innerHTML = '';
                    msg.setAttribute('hidden', 'true');
                }, 5000);
            }
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });


}

let body;

function search_results() {
    let check = true;
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let inputID = document.getElementById("search_bar_assign").value;
    fetch('/get_data/')
        .then(response => response.json())
        .then(data => {
            let students = data.filter(student => student.status === 'active');
            let myStud = students.filter(student => student.id === inputID);

            if (myStud.length > 0) {
                td1.innerHTML = myStud[0].firstname + " " + myStud[0].lastname;
                td2.innerHTML = myStud[0].GPA;
                td3.innerHTML = myStud[0].status;
                td4.innerHTML = myStud[0].id;
                td5.innerHTML = myStud[0].department
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

        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });


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
    $(document).on( function (e) {
        e.preventDefault()
        let myDept = document.getElementById("dept").value;
        $.ajax({
            type: 'POST', url: '/departAssignEdit', data: {
                department: myDept,
            }, success: function (data) {
                let message = document.getElementById('message');
                let errorMessage = data
                if (errorMessage === "Student added successfully") {
                    message.style.backgroundColor = 'green'; // set message color to red
                    message.innerHTML = errorMessage;
                    message.removeAttribute('hidden');
                    setTimeout(function () {
                        message.innerHTML = '';
                        message.setAttribute('hidden', 'true');
                    }, 5000);
                } else if (errorMessage === "Error: Student already exists") {
                    message.style.backgroundColor = 'red'; // set message color to red
                    message.innerHTML = errorMessage;
                    message.removeAttribute('hidden');
                    setTimeout(function () {
                        message.innerHTML = '';
                        message.setAttribute('hidden', 'true');
                    }, 5000);
                }
            }
        })
    })
}

const assignBtn = document.getElementById("submit_button");
assignBtn.addEventListener("click", (x) => {
    x.preventDefault();
    x.stopPropagation();
    assignDept();
});

