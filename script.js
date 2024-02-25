let courses = [];

function addCourse() {
  const courseName = document.getElementById("course-name").value;
  const creditPoints = parseFloat(document.getElementById("credit-points").value);
  const grade = document.getElementById("grade").value.toUpperCase();

  if (!isNaN(creditPoints)) {
    courses.push({ courseName, creditPoints, grade });
    createCourseColumn(courseName, creditPoints, grade);
  }
}

function createCourseColumn(courseName, creditPoints, grade) {
  const inputContainer = document.getElementById("input-container");

  const newColumn = document.createElement("div");
  newColumn.className = "course-column";
  newColumn.innerHTML = `
    <div class="form-group">
      <label>${courseName}</label>
    </div>
    <div class="form-group">
      <label>${creditPoints}</label>
    </div>
    <div class="form-group">
      <label>${grade}</label>
    </div>
    <button onclick="removeCourse(this)">Remove</button>
  `;

  inputContainer.appendChild(newColumn);
}

function calculateCGPA() {
  let totalCreditPoints = 0;
  let totalGradePoints = 0;

  for (const course of courses) {
    totalCreditPoints += course.creditPoints;
    totalGradePoints += course.creditPoints * calculateGradePoints(course.grade);
  }

  const cgpa = (totalGradePoints / totalCreditPoints).toFixed(2);
  document.getElementById("cgpa").innerText = cgpa;
}

function calculateGradePoints(grade) {
  switch (grade) {
    case "O":
      return 10.00;
    case "A+":
      return 9.00;
    case "A":
      return 8.00;
    case "B+":
      return 7.00;
    case "B":
      return 6.00;
    case "C":
      return 5.00;
      case "U":
        return 0.00;
    default:
      return NaN;
  }
}

function removeCourse(button) {
  const column = button.parentElement;
  column.parentNode.removeChild(column);

  const courseName = column.children[0].innerText;
  courses = courses.filter((course) => course.courseName !== courseName);
}
