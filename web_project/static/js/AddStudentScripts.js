var levelField = document.getElementById("level");
var departmentField = document.getElementById("department");

levelField.onchange = function() {
  if (levelField.value < 3) {
    departmentField.disabled = true;
  } else {
    departmentField.disabled = false;
  }
};

function AddLocal() {
  var fName = document.getElementById("fname").value;
  var lName = document.getElementById("lname").value;
  var ID = document.getElementById("id").value;
  var birthDate = document.getElementById("birth").value;
  var Gpa = document.getElementById("GPA").value;
  var Gender = document.getElementById("gender").value;
  var Level = document.getElementById("level").value;
  var Status = document.getElementById("status").value;
  var Department = document.getElementById("department").value;
  var Email = document.getElementById("email").value;
  var Phone = document.getElementById("phone").value;
  var StudentInfo = {
    firstName: fName,
    lastName: lName,
    sID: ID,
    sBirthDate: birthDate,
    sGpa: Gpa,
    sGender: Gender,
    sLevel: Level,
    sStatus: Status,
    sDepartment: Department,
    sEmail: Email,
    sPhone: Phone,
  };
  
  let allActiveStudents = JSON.parse(localStorage.getItem("allActiveStudents")) || [];
  let allInActiveStudents = JSON.parse(localStorage.getItem("allInActiveStudents")) || [];
  
  let isActive = false;
  let isInActive = false;
  allActiveStudents.forEach(student => {
    if (student.sID === ID) {
      isActive = true;
    }
  });
  allInActiveStudents.forEach(student => {
    if (student.sID === ID) {
      isInActive = true;
    }
  });

  if (Status === "active") {
    if (!isActive) {
      allActiveStudents.push(StudentInfo);
      localStorage.setItem("allActiveStudents", JSON.stringify(allActiveStudents));
      return "Student added successfully!";
    }
    else {
      return "The student already exists in the active list.";
    }
  } else {
    if (!isInActive) {
      allInActiveStudents.push(StudentInfo);
      localStorage.setItem("allInActiveStudents", JSON.stringify(allInActiveStudents));
      return "Student added successfully!";
    }
    else {
      return "The student already exists in the inactive list.";
    }
  }

}

function printMessage() {
  let message = document.getElementById('message');
  let errorMessage = AddLocal();
  if(errorMessage === "Student added successfully!")
  {
    message.style.backgroundColor = 'green'; // set message color to red
    message.innerHTML = errorMessage;
    message.removeAttribute('hidden');
    setTimeout(function () {
      message.innerHTML='';
      message.setAttribute('hidden', 'true');
  }, 5000);
  }
  else if (errorMessage === "The student already exists in the active list.")
  {
    message.style.backgroundColor = 'red'; // set message color to red
    message.innerHTML = errorMessage;
    message.removeAttribute('hidden');
    setTimeout(function () {
      message.innerHTML='';
      message.setAttribute('hidden', 'true');
  }, 5000);
  }
  else if (errorMessage === "The student already exists in the inactive list.")
  {
    message.style.backgroundColor = 'red'; // set message color to red
    message.innerHTML = errorMessage;
    message.removeAttribute('hidden');
    setTimeout(function () {
      message.innerHTML='';
      message.setAttribute('hidden', 'true');
  }, 5000);
  }
  
}

let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  printMessage();
});
