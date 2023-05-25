let btn = document.getElementById("btn1");
let message = document.getElementById("errf");

function search() {

    const GivenID = document.getElementById("GID").value;

    fetch('/get_data/')
        .then(response => response.json())
        .then(data => {

            let  student = data.filter(student => student.id === GivenID);


            document.getElementById("fullname").value = " " + student[0].firstname + " " + student[0].lastname;
            document.getElementById("ident").value = " " + student[0].id;
            document.getElementById("GPA").value = " " + student[0].GPA;
            document.getElementById("BD").value = " " + student[0].birthdate;
            document.getElementById("state").value = " " + student[0].status;
            document.getElementById("dept").value = " " + student[0].department;
            document.getElementById("contact").value = " " + student[0].phone;
            document.getElementById("email").value = " " + student[0].email;


            if (student.length > 0) {
                message.style.backgroundColor = 'green'; // set message color to red
                message.style.color = 'white'; // set message color to red
                message.innerHTML = "The student found";
                message.removeAttribute('hidden');
                setTimeout(function () {
                    message.innerHTML = '';
                    message.setAttribute('hidden', 'true');
                }, 5000);
            } else {
                message.style.backgroundColor = 'red'; // set message color to red
                message.style.color = 'white'; // set message color to red
                message.innerHTML = "Student not found";
                message.removeAttribute('hidden');
                setTimeout(function () {
                    message.innerHTML = '';
                    message.setAttribute('hidden', 'true');
                }, 5000);
            }
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
}

btn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    search();
});