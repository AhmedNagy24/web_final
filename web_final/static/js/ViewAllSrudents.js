fetch('/get_data/')
  .then(response => response.json())
  .then(data => {
    // Split data into active and inactive students
    const activeStudents = data.filter(student => student.status === 'active');
    const inactiveStudents = data.filter(student => student.status === 'inactive');

    // Display active students in the activeTable
    const activeTable = document.getElementById('activeTable');
    activeTable.innerHTML = generateTableHTML1(activeStudents);

    // Display inactive students in the inActiveTable
    const inactiveTable = document.getElementById('inActiveTable');
    inactiveTable.innerHTML = generateTableHTML2(inactiveStudents);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });

// Function to generate HTML table from student data for active students
function generateTableHTML1(students) {
  if (students.length === 0) {
    return '<p>No active students found.</p>';
  }

  const table1 = createTable1(students);
  return `
    <div>
      ${table1}
    </div>
  `;
}

// Function to generate HTML table from student data for inactive students
function generateTableHTML2(students) {
  if (students.length === 0) {
    return '<p>No inactive students found.</p>';
  }

  const table2 = createTable2(students);
  return `
    <div>
      ${table2}
    </div>
  `;
}

// Function to create table data for active students
const createTableData1 = (students1) => {
  let html1 = '';
  students1.forEach(student => {
    html1 += `
      <tr>
        <td>${student.firstname} ${student.lastname}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.gender}</td>
        <td>${student.level}</td>
        <td>${student.GPA}</td>
        <td>${student.department}</td>
        <td>${student.birthdate}</td>
        <td>
        <select name="status" id="status">
            <option value="active">active</option>
            <option value="inactive">inactive</option>
</td>
      </tr>
    `;
  });
  return html1;
};

// Function to create the active students table
const createTable1 = (students1) => {
  const tableData1 = createTableData1(students1);
  return `
    <table class="ActiveStudents">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">ID</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Gender</th>
          <th scope="col">Level</th>
          <th scope="col">Gpa</th>
          <th scope="col">Department</th>
          <th scope="col">BirthDate</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        ${createTableData1(students1)}
      </tbody>
    </table>
  `;
};

// Function to create table data for inactive students
const createTableData2 = (students2) => {
  let html2 = '';
  students2.forEach(student => {
    html2 += `
      <tr>
        <td>${student.firstname} ${student.lastname}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${student.gender}</td>
        <td>${student.level}</td>
        <td>${student.GPA}</td>
        <td>${student.department}</td>
        <td>${student.birthdate}</td>
        <td>
        <select name="status" id="status">
            <option value="active">active</option>
            <option value="inactive">inactive</option>
</td>
      </tr>
    `;
  });
  return html2;
};

// Function to create the inactive students table
const createTable2 = (students2) => {
  const tableData2 = createTableData2(students2);
  return `
    <table class="inActiveStudents">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">ID</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Gender</th>
          <th scope="col">Level</th>
          <th scope="col">Gpa</th>
          <th scope="col">Department</th>
          <th scope="col">BirthDate</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        ${createTableData2(students2)}
      </tbody>
    </table>
  `;
}
$(document).on('change', '#status', function () {
    var status = $(this).val();
    var id = $(this).closest('tr').find('td:eq(1)').text();
    var data = { 'status': status, 'id': id };
    $.ajax({
        url: '/change_status/',
        type: 'POST',
        data: data,
        success: function (response) {
        console.log(response);
        },
        error: function (response) {
        console.log(response);
        }
    });
});