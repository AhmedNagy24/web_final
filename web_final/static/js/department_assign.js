
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
                    let dep = document.getElementById('dept');
                    dep.removeAttribute('hidden');
                    let butt = document.getElementById('submit_button');
                    butt.removeAttribute('hidden');
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
                let dep = document.getElementById('dept');
                dep.removeAttribute('hidden');
                let butt = document.getElementById('submit_button');
                butt.removeAttribute('hidden');
                let z = document.getElementById('student_data');
                z.remove();
                let y = document.createElement('tbody');
                y.id = 'student_data';
                z.append(y);
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
                let dep = document.getElementById('dept');
                dep.removeAttribute('hidden');
                let butt = document.getElementById('submit_button');
                butt.removeAttribute('hidden');
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
                let dep = document.getElementById('dept');
                dep.setAttribute('hidden', 'true');
                let butt = document.getElementById('submit_button');
                butt.setAttribute('hidden', 'true');
                let z = document.getElementById('student_data');
                z.remove();
                let y = document.createElement('tbody');
                y.id = 'student_data';
                z.append(y);

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

$(document).on('click', '#submit_button', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/depart-assign-edit',
        data: {
            department: $('#dept').val(),
            id: $('#search_bar_assign').val(),
            csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
        },
        success: function () {
            let msg = $('#message');
            msg.removeAttr('hidden');
            msg.append("Student added successfully to " + $('#dept').val() + "!");
            msg.css('background-color', 'green');
            setTimeout(function () {
                msg.empty();
                msg.attr('hidden', 'true');
            }, 4500);
            let x = $('#student_data');
            x.remove();
            let y = $('<tbody></tbody>');
            y.attr('id', 'student_data');
            let z = $('#data');
            z.append(y);
            search_results();
            search_to_assign();
        },
        error: function (xhr, status, error) {
            console.log('AJAX request error:', error);
        }
    });
});



