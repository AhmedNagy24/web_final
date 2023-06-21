let givenID;

function search_student() {
    givenID = document.getElementById("idNum").value;
    fetch('/get_data/')
        .then(response => response.json())
        .then(data => {
            const student = data.filter(student => student['id'] === givenID);
            let found = true;
            if (student.length === 0) {
                found = false;
            }
            if (found) {
                displayInfo(student)
                if (student[0]['status'] === "inactive") {
                    disable(true)
                }
                printMessage('msg-container', 'Student found successfully!');
            } else {
                printAlert('msg-container', 'Student not found!');
                givenID=null;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

let search_form = document.getElementById('search-form')
search_form.addEventListener('submit', ev => {
    ev.preventDefault()
    ev.stopPropagation()
    reset_form()
    search_student()
})

$(document).on('submit', '#form', function (e) {
    e.preventDefault()
    let num = document.getElementById('phone').value
    if (!isPhone(num)) {
        document.getElementById('phone').focus();
        printAlert('phone-alert', 'Error: phone number is invalid!');
        return
    }
    let depart = document.getElementById('department').value
    let level = document.getElementById('level').value
    if (level<3){
        depart = 'General';
    }
    $.ajax({
        url: '/edit-student',
        type: 'POST',
        data: {
            first_name: $('#fname').val(),
            last_name: $('#lname').val(),
            ID: $('#id').val(),
            mail: $('#email').val(),
            phone: $('#phone').val(),
            gender: $('#gender').val(),
            level: $('#level').val(),
            department: depart,
            status: $('#status').val(),
            gpa: $('#GPA').val(),
            birth_date: $('#birth').val(),
            old_id: givenID,
            csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
        },
        success: function (response) {
            if (response === "Student information is updated successfully!") {
                document.getElementById('idNum').focus();
                printMessage('msg-container', response);
                reset_form()
            } else if (response === "Error: ID already in use! please enter a unique ID") {
                document.getElementById('id').focus();
                printAlert('id-alert', response);
            }
        }
    })
})
$(document).on('click', '#delete-student', function (e) {
    e.preventDefault()
    if (givenID===null){
        return;
    }
    let check = confirm("Are sure you want to delete student: " + givenID)
    if (!check) {
        return
    }
    $.ajax({
        type: 'POST',
        url: '/delete-student',
        data: {
            id: givenID,
            csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
        },
        success: function (response) {
            if (response === "Student deleted successfully!") {
                document.getElementById('idNum').focus();
                printMessage('msg-container', 'Student deleted successfully!');
                reset_form()
            }
        }
    })
})

function isPhone(number) {
    let pattern = /^\d{7,15}$/;

    return pattern.test(number);
}

function displayInfo(st) {
    document.getElementById('fname').value = st[0]['firstname'];
    document.getElementById('lname').value = st[0]['lastname'];
    document.getElementById('id').value = st[0]['id'];
    document.getElementById('email').value = st[0]['email'];
    document.getElementById('phone').value = st[0]['phone'];

    let genderList = document.getElementById('gender').children;
    for (let i = 0; i < genderList.length; i++) {
        genderList[i].selected = false;
        if (genderList[i].value == st[0]['gender']) {
            genderList[i].selected = true;
        }
    }

    let levelList = document.getElementById('level').children;
    for (let i = 0; i < levelList.length; i++) {
        levelList[i].selected = false;
        if (levelList[i].value == st[0]['level']) {
            levelList[i].selected = true;
        }
    }

    let departList = document.getElementById('department').children;
    for (let i = 0; i < departList.length; i++) {
        departList[i].selected = false;
        if (departList[i].value == st[0]['department']) {
            departList[i].selected = true;
        }
    }

    let statList = document.getElementById('status').children;
    for (let i = 0; i < statList.length; i++) {
        statList[i].selected = false;
        if (statList[i].value == st[0]['status']) {
            statList[i].selected = true;
        }
    }

    document.getElementById('GPA').value = st[0]['GPA'];
    document.getElementById('birth').value = st[0]['birthdate'];
}


function printMessage(place, text) {
    let message = document.getElementById(place);
    let x = document.createElement('div');
    x.setAttribute('id', 'message');
    x.innerHTML = text;
    message.appendChild(x);
    setTimeout(function () {
        message.removeChild(x);
    }, 5000);
}

function printAlert(place, text) {
    let message = document.getElementById(place);
    let x = document.createElement('div');
    x.setAttribute('id', 'alert');
    x.innerHTML = text;
    message.appendChild(x);
    setTimeout(function () {
        message.removeChild(x);
    }, 5000);
}

function disable(choice) {
    document.getElementById('fname').disabled = choice
    document.getElementById('lname').disabled = choice
    document.getElementById('id').disabled = choice
    document.getElementById('email').disabled = choice
    document.getElementById('phone').disabled = choice
    document.getElementById('gender').disabled = choice
    document.getElementById('level').disabled = choice
    document.getElementById('GPA').disabled = choice
    document.getElementById('birth').disabled = choice
}

function reset_form() {
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('id').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';

    let genderList = document.getElementById('gender').children;
    for (let i = 0; i < genderList.length; i++) {
        genderList[i].selected = false;
    }
    genderList[0].selected = true;

    let levelList = document.getElementById('level').children;
    for (let i = 0; i < levelList.length; i++) {
        levelList[i].selected = false;
    }
    levelList[0].selected = true;

    let departList = document.getElementById('department').children;
    for (let i = 0; i < departList.length; i++) {
        departList[i].selected = false;
    }
    departList[0].selected = true;

    let statList = document.getElementById('status').children;
    for (let i = 0; i < statList.length; i++) {
        statList[i].selected = false;
    }
    statList[0].selected = true;

    document.getElementById('GPA').value = '';
    document.getElementById('birth').value = '';
    disable(false)
}