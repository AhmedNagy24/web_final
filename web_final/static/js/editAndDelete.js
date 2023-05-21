const search = document.getElementById("search-form")
// add event listener to this button
search.addEventListener('submit', (e)=> {
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
})

function isPhone(number) {
    let pattern = /^\d{7,15}$/;

    return pattern.test(number);
}

function disable() {
    document.getElementById('fname').setAttribute('disabled', 'true');
    document.getElementById('lname').setAttribute('disabled', 'true');
    document.getElementById('id').setAttribute('disabled', 'true');
    document.getElementById('email').setAttribute('disabled', 'true');
    document.getElementById('phone').setAttribute('disabled', 'true');
    document.getElementById('gender').setAttribute('disabled', 'true');
    document.getElementById('level').setAttribute('disabled', 'true');
    document.getElementById('GPA').setAttribute('disabled', 'true');
    document.getElementById('birth').setAttribute('disabled', 'true');
}

function isUnique(id, st1, st2, index1, index2) {
    if (index1!==-1){
        for (let i=0; i<st1.length; i++){
            if (i===index1){
                continue;
            }
            if (st1[i].sID==id){
                return false;
            }
        }
    }else if (index2!==-1){
        for (let i=0; i<st2.length; i++){
            if (i===index2){
                continue;
            }
            if (st2[i].sID==id){
                return false;
            }
        }
    }
    return true;
}

function updateLocal(stList, index) {
    stList[index].firstName = document.getElementById('fname').value;
    stList[index].lastName = document.getElementById('lname').value;
    stList[index].sID = document.getElementById('id').value;
    stList[index].sPhone = document.getElementById('phone').value;
    stList[index].sEmail = document.getElementById('email').value;
    stList[index].sGpa = document.getElementById('GPA').value;
    stList[index].sGender = document.getElementById('gender').value;
    stList[index].sStatus = document.getElementById('status').value;
    stList[index].sBirthDate = document.getElementById('birth').value;
    stList[index].sLevel = document.getElementById('level').value;
}

function findStudent(students1, students2, id) {
    for (let i=0; i<students1.length; i++){
        if (students1[i].sID==id){
            return students1[i];
        }
    }
    for (let i=0; i<students2.length; i++){
        if (students2[i].sID==id){
            return students2[i];
        }
    }
    return null;
}

function displayInfo(st) {
    document.getElementById('fname').setAttribute('value', st.firstName);
    document.getElementById('lname').setAttribute('value', st.lastName);
    document.getElementById('id').setAttribute('value', st.sID);
    document.getElementById('email').setAttribute('value', st.sEmail);
    document.getElementById('phone').setAttribute('value', st.sPhone);
    let genderList = document.getElementById('gender').children;
    for (let i = 0; i<genderList.length; i++){
        if (genderList[i].value==st.sGender){
            genderList[i].setAttribute('selected', 'true');
        }
    }
    let levelList = document.getElementById('level').children;
    for (let i = 0; i<levelList.length; i++){
        if (levelList[i].value == st.sLevel){
            levelList[i].setAttribute('selected', 'true');
        }
    }
    let departList = document.getElementById('department').children;
    for (let i=0; i<departList.length; i++){
        if (departList[i].value==st.sDepartment){
            departList[i].setAttribute('selected', 'true');
        }
    }
    let statList = document.getElementById('status').children;
    for (let i=0; i<statList.length; i++){
        if (statList[i].value==st.sStatus){
            statList[i].setAttribute('selected', 'true');
        }
    }
    document.getElementById('GPA').setAttribute('value', st.sGpa);
    document.getElementById('birth').setAttribute('value', st.sBirthDate);
}

function printMessage(place,text) {
    let message = document.getElementById(place);
    let x = document.createElement('div');
    x.setAttribute('id', 'message');
    x.innerHTML=text;
    message.appendChild(x);
    setTimeout(function () {
        message.removeChild(x);
    }, 5000);
}
function printAlert(place, text) {
    let message = document.getElementById(place);
    let x = document.createElement('div');
    x.setAttribute('id', 'alert');
    x.innerHTML=text;
    message.appendChild(x);
    setTimeout(function () {
        message.removeChild(x);
    }, 5000);
}