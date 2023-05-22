let btn = document.getElementById("btn1");
let message = document.getElementById("errf");
const GivenID = document.getElementById("GID").value;

fetch('/get_data/')
  .then(response => response.json())
  .then(data => {
        const Students = data.filter(student => student.id === GivenID);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });


btn.addEventListener('click' , (event)=> {
    event.preventDefault();
    let found = false;
    document.getElementById("fullname").value =" ";
    document.getElementById("ident").value = " ";
    document.getElementById("GPA").value = " ";
    document.getElementById("BD").value =" ";
    document.getElementById("state").value =" ";
    document.getElementById("dept").value =  " ";
    document.getElementById("contact").value = " ";
    document.getElementById("email").value =" ";

    Students.forEach(student => {
        if(student.id === GivenID)
        {
            document.getElementById("fullname").value =" "+ student.firstName +" "+ student.lastName;
            document.getElementById("ident").value = " "+student.id ;
            document.getElementById("GPA").value = " "+ student.GPA;
            document.getElementById("BD").value =" "+ student.birthdate;
            document.getElementById("state").value =" "+ student.status;
            document.getElementById("dept").value =  " "+student.department;
            document.getElementById("contact").value = " "+student.phone;
            document.getElementById("email").value =" "+ student.email;
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