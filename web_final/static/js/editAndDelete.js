let givenID;
function search_student() {
    givenID = document.getElementById("idNum").value;
    fetch('/get_data/')
        .then(response => response.json())
        .then(data => {
            const student = data.filter(student => student['id'] === givenID);
            let found=true;
            if (student.length===0){
                found=false;
            }
            if (found) {
                displayInfo(student)
                if (student[0]['status']==="inactive"){
                    disable(true)
                }
                printMessage('msg-container','Student found successfully!');
            } else {
                printAlert('msg-container','Student not found!');
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
    if (!isPhone(num)){
        document.getElementById('phone').focus();
        printAlert('phone-alert','Error: phone number is invalid!');
        return
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
            department: $('#department').val(),
            status: $('#status').val(),
            gpa: $('#GPA').val(),
            birth_date: $('#birth').val(),
            old_id: givenID,
            csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
        },
        success: function (response){
          if (response==="Student information is updated successfully!"){
              document.getElementById('idNum').focus();
              printMessage('msg-container',response);
              reset_form()
          }else if (response==="Error: ID already in use! please enter a unique ID"){
              document.getElementById('id').focus();
              printAlert('id-alert',response);
          }
        }
    })
})
$(document).on('click', '#delete-student', function (e){
    e.preventDefault()
    let check = confirm("Are sure you want to delete student: " + givenID)
    if (!check){
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
            if (response==="Student deleted successfully!"){
                document.getElementById('idNum').focus();
                printMessage('msg-container','Student deleted successfully!');
                reset_form()
            }
        }
    })
})
// add event listener to this button
/*search.addEventListener('submit', (e)=> {
    e.preventDefault();
    // get all the data of active students from the local storage
    let students1 = JSON.parse(localStorage.getItem("allActiveStudents")) || [];
    let students2 = JSON.parse(localStorage.getItem("allInActiveStudents")) || [];
    let id = document.getElementById('idNum').value;
    let st = findStudent(students1, students2, id);
    if (st !== null){
        let index1=-1;
        let index2=-1;
        if (students1.length!==0){
            index1 = students1.findIndex((x) => x===st);
        }
        if (students2.length!==0){
            index2 = students2.findIndex((x) => x===st);
        }
        if (index2!==-1){
            disable();
        }
        displayInfo(st);
        printMessage('msg-container','Student found successfully!');
        const edit = document.getElementById('form');
        edit.addEventListener('submit', (e) =>{
            e.preventDefault();
            let newId = document.getElementById('id').value;
            let newPhone = document.getElementById('phone').value;
            if (isUnique(newId, students1, students2, index1, index2)&&isPhone(newPhone)){
                let newState = document.getElementById('status').value;
                if (index1 !== -1 && st.sStatus === newState){
                    updateLocal(students1, index1);
                    localStorage.setItem('allActiveStudents', JSON.stringify(students1));
                }else if (index2 !== -1 && st.sStatus === newState){
                    updateLocal(students2, index2);
                    localStorage.setItem('allInActiveStudents', JSON.stringify(students2));
                }else if (index1 !== -1 && st.sStatus !== newState){
                    students2.push({
                        firstName: document.getElementById('fname').value,
                        lastName: document.getElementById('lname').value,
                        sID: document.getElementById('id').value,
                        sBirthDate: document.getElementById('birth').value,
                        sGpa: document.getElementById('GPA').value,
                        sGender: document.getElementById('gender').value,
                        sLevel: document.getElementById('level').value,
                        sStatus: document.getElementById('status').value,
                        sDepartment: document.getElementById('department').value,
                        sEmail: document.getElementById('email').value,
                        sPhone: document.getElementById('phone').value,
                    });
                    students1.splice(index1, 1);
                    index1 = -1;
                    index2 = students2.length-1;
                    localStorage.setItem('allActiveStudents', JSON.stringify(students1));
                    localStorage.setItem('allInActiveStudents', JSON.stringify(students2));
                }else if (index2 !== -1 && st.sStatus !== newState){
                    st.sStatus=newState;
                    students1.push(st);
                    students2.splice(index2, 1);
                    index1 = students1.length-1
                    index2 = -1;
                    localStorage.setItem('allActiveStudents', JSON.stringify(students1));
                    localStorage.setItem('allInActiveStudents', JSON.stringify(students2));
                }
                scrollTo(0, 0);
                printMessage('msg-container','Student information is updated successfully!');
                setTimeout(function () {
                    location.reload();
                }, 2000)
            }else if(!isUnique(newId, students1, students2, index1, index2)&&isPhone(newPhone)){
                document.getElementById('id').focus();
                printAlert('id-alert','Error: ID already in use! please enter a unique ID');
            }else if(isUnique(newId, students1, students2, index1, index2)&&!isPhone(newPhone)){
                document.getElementById('phone').focus();
                printAlert('phone-alert','Error: phone number is invalid!');
            }else if(!isUnique(newId, students1, students2, index1, index2)&&!isPhone(newPhone)){
                printAlert('phone-alert','Error: phone number is invalid!');
                printAlert('id-alert','Error: ID already in use! please enter a unique ID');
            }
        })
        let del = document.getElementById('delete-student');
        del.addEventListener('click', (e)=>{
            e.preventDefault();
            if (index1 !== -1){
                students1.splice(index1,1);
                localStorage.setItem('allActiveStudents', JSON.stringify(students1));
            }else if (index2 !== -1){
                students2.splice(index2, 1);
                localStorage.setItem('allInActiveStudents', JSON.stringify(students2));
            }
            scrollTo(0, 0);
            printMessage('msg-container','Student deleted');
            setTimeout(function () {
                location.reload();
            }, 2000)
        })
    }else {
        printAlert('msg-container','Student not found!');
    }
})*/

function isPhone(number) {
    let pattern = /^\d{7,15}$/;

    return pattern.test(number);
}

function displayInfo(st) {
    document.getElementById('fname').setAttribute('value', st[0]['firstname']);
    document.getElementById('lname').setAttribute('value', st[0]['lastname']);
    document.getElementById('id').setAttribute('value', st[0]['id']);
    document.getElementById('email').setAttribute('value', st[0]['email']);
    document.getElementById('phone').setAttribute('value', st[0]['phone']);
    let genderList = document.getElementById('gender').children;
    for (let i = 0; i < genderList.length; i++) {
        genderList[i].selected=false
    }
    for (let i = 0; i < genderList.length; i++) {
        if (genderList[i].value == st[0]['gender']) {
            genderList[i].selected = true
        }
    }
    let levelList = document.getElementById('level').children;
    for (let i = 0; i < levelList.length; i++) {
        levelList[i].selected=false
    }
    for (let i = 0; i < levelList.length; i++) {
        if (levelList[i].value == st[0]['level']) {
            levelList[i].selected = true
        }
    }
    let departList = document.getElementById('department').children;
    for (let i = 0; i < departList.length; i++) {
        departList[i].selected=false
    }
    for (let i = 0; i < departList.length; i++) {
        if (departList[i].value == st[0]['department']) {
            departList[i].selected = true
        }
    }
    let statList = document.getElementById('status').children;
    for (let i = 0; i < statList.length; i++) {
        statList[i].selected=false
    }
    for (let i = 0; i < statList.length; i++) {
        if (statList[i].value == st[0]['status']) {
            statList[i].selected = true
        }
    }
    document.getElementById('GPA').setAttribute('value', st[0]['GPA']);
    document.getElementById('birth').setAttribute('value', st[0]['birthdate']);
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
    document.getElementById('fname').setAttribute('value', '');
    document.getElementById('lname').setAttribute('value', '');
    document.getElementById('id').setAttribute('value', '');
    document.getElementById('email').setAttribute('value', '');
    document.getElementById('phone').setAttribute('value', '');
    let genderList = document.getElementById('gender').children;
    for (let i = 0; i < genderList.length; i++) {
        genderList[i].selected=false
    }
    genderList[0].selected = true
    let levelList = document.getElementById('level').children;
    for (let i = 0; i < levelList.length; i++) {
        levelList[i].selected=false
    }
    levelList[0].selected = true
    let departList = document.getElementById('department').children;
    for (let i = 0; i < departList.length; i++) {
        departList[i].selected=false
    }
    departList[0].selected = true
    let statList = document.getElementById('status').children;
    for (let i = 0; i < statList.length; i++) {
        statList[i].selected=false
    }
    statList[0].selected = true
    document.getElementById('GPA').setAttribute('value', '');
    document.getElementById('birth').setAttribute('value', '');
    disable(false)
}