let btn = document.getElementById("btn1");
let message = document.getElementById("errf");
btn.addEventListener('click' , (event)=> {
    event.preventDefault();
    const data1 = localStorage.getItem("allActiveStudents");
    const data2 = localStorage.getItem("allInActiveStudents");
    const students1 = JSON.parse(data1);
    const students2 = JSON.parse(data2);
    const data3 = students1.concat(students2);
    let found = false;
    document.getElementById("fullname").value =" ";
    document.getElementById("ident").value = " ";
    document.getElementById("GPA").value = " ";
    document.getElementById("BD").value =" ";
    document.getElementById("state").value =" ";
    document.getElementById("dept").value =  " ";
    document.getElementById("contact").value = " ";
    document.getElementById("email").value =" ";

    var GivenID = document.getElementById("GID").value;

    data3.forEach(student => {
        if(student.sID == GivenID)
        {
            document.getElementById("fullname").value =" "+ student.firstName +" "+ student.lastName;
            document.getElementById("ident").value = " "+student.sID;
            document.getElementById("GPA").value = " "+student.sGpa;
            document.getElementById("BD").value =" "+ student.sBirthDate;
            document.getElementById("state").value =" "+ student.sStatus;
            document.getElementById("dept").value =  " "+student.sDepartment;
            document.getElementById("contact").value = " "+student.sPhone;
            document.getElementById("email").value =" "+ student.sEmail;
            found = true;
        }
    });
    if (found)
    {
        message.style.backgroundColor = 'green'; // set message color to red
        message.style.color = 'black'; // set message color to red
        message.innerHTML = "The student found";
        message.removeAttribute('hidden');
        setTimeout(function () {
            message.innerHTML='';
            message.setAttribute('hidden', 'true');
        }, 5000);
    }
    else
    {
        message.style.backgroundColor = 'red'; // set message color to red
        message.style.color = 'black'; // set message color to red
        message.innerHTML = "Student not found in the local storage";
        message.removeAttribute('hidden');
        setTimeout(function () {
            message.innerHTML='';
            message.setAttribute('hidden', 'true');
        }, 5000);
    }

})