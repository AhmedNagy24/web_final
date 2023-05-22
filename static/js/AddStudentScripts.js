var levelField = document.getElementById("level");
var departmentField = document.getElementById("department");

levelField.onchange = function () {
    if (levelField.value < 3) {
        departmentField.disabled = true;
    } else {
        departmentField.disabled = false;
    }
};


function printMessage(error) {
    let message = document.getElementById('message');
    let errorMessage = error
    if (errorMessage === "Student added successfully!") {
        message.style.backgroundColor = 'green'; // set message color to red
        message.innerHTML = errorMessage;
        message.removeAttribute('hidden');
        setTimeout(function () {
            message.innerHTML = '';
            message.setAttribute('hidden', 'true');
        }, 5000);
    } else if (errorMessage === "The student already exists in the active list.") {
        message.style.backgroundColor = 'red'; // set message color to red
        message.innerHTML = errorMessage;
        message.removeAttribute('hidden');
        setTimeout(function () {
            message.innerHTML = '';
            message.setAttribute('hidden', 'true');
        }, 5000);
    } else if (errorMessage === "The student already exists in the inactive list.") {
        message.style.backgroundColor = 'red'; // set message color to red
        message.innerHTML = errorMessage;
        message.removeAttribute('hidden');
        setTimeout(function () {
            message.innerHTML = '';
            message.setAttribute('hidden', 'true');
        }, 5000);
    }

}

let message = ""

$(document).on('submit', '#form', function (e) {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: '/add-student',
        data: {
            first_name: $('#fname').val(),
            last_name: $('#lname').val(),
            ID: $('#id').val(),
            mail: $('#email').val(),
            phone: $('#phone').val(),
            gender: $('#gender').val(),
            level: $('#level').val(),
            department: $('#department').val(),
            status: $('#status').val(),
            gpa: $('#GPA').val(),
            birth_date: $('#birth').val(),
            csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
        },
        success: function (data) {
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
