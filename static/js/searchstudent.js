let btn = document.getElementById("btn1");
let message = document.getElementById("errf");
function search() {

    const GivenID = document.getElementById("GID").value;

    fetch('/get_data/')
        .then(response => response.json())
        .then(data => {

            const student = data.filter(student => student.id === GivenID);

            let found = false;

            // document.getElementById("fullname").value = " ";
            // document.getElementById("ident").value = " ";
            // document.getElementById("GPA").value = " ";
            // document.getElementById("BD").value = " ";
            // document.getElementById("state").value = " ";
            // document.getElementById("dept").value = " ";
            // document.getElementById("contact").value = " ";
            // document.getElementById("email").value = " ";


            document.getElementById("fullname").value = " " + student[0].firstName + " " + student.lastName;
            document.getElementById("ident").value = " " + student[0].id;
            document.getElementById("GPA").value = " " + student[0].GPA;
            document.getElementById("BD").value = " " + student[0].birthdate;
            document.getElementById("state").value = " " + student[0].status;
            document.getElementById("dept").value = " " + student[0].department;
            document.getElementById("contact").value = " " + student[0].phone;
            document.getElementById("email").value = " " + student[0].email;

            found = true;


            if(found){
                message.style.backgroundColor = 'green'; // set message color to red
                message.style.color = 'black'; // set message color to red
                message.innerHTML = "The student found";
                message.removeAttribute('hidden');
                setTimeout(function () {
                    message.innerHTML = '';
                    message.setAttribute('hidden', 'true');
                }, 5000);
            } else {
                message.style.backgroundColor = 'red'; // set message color to red
                message.style.color = 'black'; // set message color to red
                message.innerHTML = "Student not found in the local storage";
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

btn.addEventListener('click' , (event)=> {
    event.preventDefault();
    event.stopPropagation();
    search();
});