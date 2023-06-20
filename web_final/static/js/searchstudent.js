let btn = document.getElementById("btn1");
let message = document.getElementById("errf");

function search() {

    const GivenID = document.getElementById("GID").value;

    fetch('/get_data/')
        .then(response => response.json())
        .then(data => {

            let student = data.filter(student => student.id === GivenID);
            student = student.filter(student => student.status === "active");

            if (student.length > 0) {
                printMessage("msg-container", "Student found!")
            } else if (student.length === 0) {
                printAlert("msg-container", "Student not found!")
                return
            }
            document.getElementById("fullname").value = " " + student[0].firstname + " " + student[0].lastname;
            document.getElementById("ident").value = " " + student[0].id;
            document.getElementById("GPA").value = " " + student[0].GPA;
            document.getElementById("BD").value = " " + student[0].birthdate;
            document.getElementById("state").value = " " + student[0].status;
            document.getElementById("dept").value = " " + student[0].department;
            document.getElementById("contact").value = " " + student[0].phone;
            document.getElementById("email").value = " " + student[0].email;

        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
}

btn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    reset_form();
    search();
});

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

function reset_form() {
    document.getElementById("fullname").value = ""
    document.getElementById("ident").value = ""
    document.getElementById("GPA").value = ""
    document.getElementById("BD").value = ""
    document.getElementById("state").value = ""
    document.getElementById("dept").value = ""
    document.getElementById("contact").value = ""
    document.getElementById("email").value = ""
}