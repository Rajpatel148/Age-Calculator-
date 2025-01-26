function calculateAge() {
  const yearInputElement = document.getElementById("year");
  const monthInputElement = document.getElementById("month");
  const dayInputElement = document.getElementById("day");
  const errorElements = document.getElementsByClassName("error");
  const errorfield = document.getElementsByClassName("input-box");

  const yearInput = parseInt(yearInputElement.value);
  const monthInput = parseInt(monthInputElement.value) - 1;
  const dayInput = parseInt(dayInputElement.value);


  let today = new Date();
  const birthDate = new Date(yearInput, monthInput, dayInput);

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (isNaN(yearInput) || isNaN(monthInput) || isNaN(dayInput)) {
    alert("Please enter full date");
    return;
  }

    // Check if the inputs are integers
    if (!Number.isInteger(Number(yearInputElement.value)) || !Number.isInteger(Number(monthInputElement.value)) || !Number.isInteger(Number(dayInputElement.value))) {
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].style.display = 'block';
            errorfield[i].style.borderColor = 'red';
        }
        return;
    }
  if (dayInput > 31 || dayInput < 1) {
    errorElements[0].style.display = "block";
    errorfield[0].style.borderColor = "red";
    return;
  }
  if (monthInput > 11 || monthInput < 0) {
    errorElements[1].style.display = "block";
    errorfield[1].style.borderColor = "red";
    return;
  }
  if (yearInput > today.getFullYear() || yearInput < 0) {
    errorElements[2].style.display = "block";
    errorfield[2].style.borderColor = "red";
    return;
  }

  // Check for invalid days in months that do not have 31 days
  if (
    dayInput === 31 &&
    (monthInput === 3 ||
      monthInput === 5 ||
      monthInput === 8 ||
      monthInput === 10)
  ) {
    errorElements[0].style.display = "block";
    errorfield[0].style.borderColor = "red";
    return;
  }

  // Check for invalid days in February, including leap years
  if (monthInput === 1) {
    const isLeapYear =
      (yearInput % 4 === 0 && yearInput % 100 !== 0) || yearInput % 400 === 0;
    if (dayInput > 29 || (dayInput === 29 && !isLeapYear)) {
      errorElements[0].style.display = "block";
      errorfield[0].style.borderColor = "red";
      return;
    }
  }

  if (
    yearInput > today.getFullYear() ||
    (yearInput == today.getFullYear() && monthInput > today.getMonth()) ||
    (yearInput == today.getFullYear() &&
      monthInput == today.getMonth() &&
      dayInput > today.getDate())
  ) {
    for (let i = 0; i < errorElements.length; i++) {
      errorElements[i].style.display = "block";
      errorfield[i].style.borderColor = "red";
    }
    return;
  }
  if(yearInput<100){
    ageYears +=1900;
  }
  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  document.getElementById("out-year").innerText = ageYears;
  document.getElementById("out-month").innerText = ageMonths;
  document.getElementById("out-day").innerText = ageDays;
}

function removeError() {
  const errorfield = document.getElementsByClassName("input-box");
  const errorElements = document.getElementsByClassName("error");
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].style.display = "none";
    errorfield[i].style.borderColor = "rgba(0, 0, 0, 0.274)";
  }
}

document.getElementById("enter-b").addEventListener("click", function() {
    removeError();
    calculateAge();
});


document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      document.getElementById('enter-b').click();
  }
});
