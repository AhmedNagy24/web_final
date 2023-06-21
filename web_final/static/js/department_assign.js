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
                    document.getElementById("2Nd").setAttribute("hidden", "true");
                } else if (myGPA >= 2.5) {
                    document.getElementById("dept").removeAttribute("hidden");
                    document.getElementById("1St").removeAttribute("hidden");
                    document.getElementById("5Th").removeAttribute("hidden");
                    document.getElementById("4Th").removeAttribute("hidden");
                    document.getElementById("3Rd").setAttribute("hidden", "true");
                    document.getElementById("2Nd").setAttribute("hidden", "true");
                } else if (myGPA >= 2.2) {
                    document.getElementById("dept").removeAttribute("hidden");
                    document.getElementById("4Th").removeAttribute("hidden");
                    document.getElementById("5Th").removeAttribute("hidden");
                    document.getElementById("3Rd").setAttribute("hidden", "true");
                    document.getElementById("2Nd").setAttribute("hidden", "true");
                    document.getElementById("1St").setAttribute("hidden", "true");
                } else if (myGPA >= 2) {
                    document.getElementById("dept").removeAttribute("hidden");
                    document.getElementById("5Th").removeAttribute("hidden");
                    document.getElementById("4Th").setAttribute("hidden", "true");
                    document.getElementById("3Rd").setAttribute("hidden", "true");
                    document.getElementById("2Nd").setAttribute("hidden", "true");
                    document.getElementById("1St").setAttribute("hidden", "true");
                }
                else {
                    document.getElementById("4Th").setAttribute("hidden", "true");
                    document.getElementById("3Rd").setAttribute("hidden", "true");
                    document.getElementById("2Nd").setAttribute("hidden", "true");
                    document.getElementById("1St").setAttribute("hidden", "true");
                    document.getElementById("5Th").setAttribute("hidden", "true");
                    document.getElementById("dept").setAttribute("hidden", "true");
                    let msg = document.getElementById('message');
                    msg.style.backgroundColor = "red";
                    msg.removeAttribute("hidden");
                    msg.style.backgroundColor = "red";
                    msg.append(" Student GPA is not enough for department assignment ");
                    setTimeout(function () {
                        msg.innerHTML = '';
                        msg.setAttribute('hidden', 'true');
                    }, 5000);
                }
            } else  {
                document.getElementById("4Th").setAttribute("hidden", "true");
                document.getElementById("3Rd").setAttribute("hidden", "true");
                document.getElementById("2Nd").setAttribute("hidden", "true");
                document.getElementById("1St").setAttribute("hidden", "true");
                document.getElementById("5Th").setAttribute("hidden", "true");
                document.getElementById("dept").setAttribute("hidden", "true");
                let msg = document.getElementById('message');
                msg.style.backgroundColor = "red";
                msg.removeAttribute("hidden");
                msg.style.backgroundColor = "red";
                msg.append(" Student is not eligible for department assignment ");
                setTimeout(function () {
                    msg.innerHTML = '';
                    msg.setAttribute('hidden', 'true');
                }, 5000);

            }

        })
        .catch(error => {
            document.getElementById("4Th").setAttribute("hidden", "true");
            document.getElementById("3Rd").setAttribute("hidden", "true");
            document.getElementById("2Nd").setAttribute("hidden", "true");
            document.getElementById("1St").setAttribute("hidden", "true");
            document.getElementById("5Th").setAttribute("hidden", "true");
            document.getElementById("dept").setAttribute("hidden", "true");
            let msg = document.getElementById('message');
            msg.style.backgroundColor = "red";
            msg.removeAttribute("hidden");
            msg.style.backgroundColor = "red";
            msg.append("Student is not found");
            setTimeout(function () {
                msg.innerHTML = '';
                msg.setAttribute('hidden', 'true');
            }, 5000);

        });


}

let body;

function search_results() {
    let x = document.getElementById('student_data');
    x.remove();
    let y = document.createElement('tbody');
    y.setAttribute('id', 'student_data');
    let tab = document.getElementById('data');
    tab.append(y);
    let inputID = document.getElementById("search_bar_assign").value;
    fetch('/get_data/')
        .then(response => response.json())
        .then(data => {
            let students = data.filter(student => student.status === 'active');
            let myStud = students.filter(student => student.id === inputID);
            let myLevel = myStud[0].level;
            let myGPA = myStud[0].GPA;
            if (myStud.length > 0 && myGPA>= 2) {
                if (myLevel <= 2) {
                    return;
                }
                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");
                let td5 = document.createElement("td");
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
    search_results();
    search_to_assign();
});
$(document).on('click', '#submit_button', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/departAssignEdit',
        data: {
            department: $('#dept').val(),
            id: $('#search_bar_assign').val(),
            csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
        },
        success: function (response) {

            let res = response.toString();

            let msg = $('#message');
            msg.removeAttr('hidden');
            msg.append('  '+ response);
            if (res.includes("\n")) {
                msg.css('background-color', 'green')
                let x = $('#student_data');
                x.remove();
                let y = $('<tbody></tbody>');
                y.attr('id', 'student_data');
            } else {
                msg.css('background-color', 'red');
            }
            setTimeout(function () {
                msg.empty();
                msg.attr('hidden', 'true');
                msg.css('background-color', 'white');
                msg.innerHTML = '';
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
            let msg = document.getElementById('message');
            msg.style.backgroundColor = "red";
            msg.removeAttribute("hidden");
            msg.style.backgroundColor = "red";
            msg.append(error);
            setTimeout(function () {
                msg.innerHTML = '';
                msg.setAttribute('hidden', 'true');
            }, 5000);
        }
    });
});



