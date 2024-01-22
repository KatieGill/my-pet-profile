export const calculateBirthday = (dob: Date) => {
  const dateOfBirth = new Date(`${dob} GMT-0500`);
  const dobYear = dateOfBirth.getFullYear();
  const dobMonth = dateOfBirth.getMonth();
  const dobDate = dateOfBirth.getDate();
  let month;
  switch (dobMonth) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }
  return `${month} ${dobDate}, ${dobYear}`;
};

export const calculateAge = (dob: Date) => {
  const today = new Date();
  const dateOfBirth = new Date(`${dob} GMT-0500`);
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  const dobYear = dateOfBirth.getFullYear();
  const dobMonth = dateOfBirth.getMonth();
  const dobDate = dateOfBirth.getDate();
  let years = todayYear - dobYear;
  let months = 0;
  let days = 0;
  if (todayMonth >= dobMonth) {
    months = todayMonth - dobMonth;
  } else {
    years--;
    months = 12 + todayMonth - dobMonth;
  }
  if (todayDate >= dobDate) {
    days = todayDate - dobDate;
  } else {
    months--;
    days = 31 + todayDate - dobDate;
  }
  return `${years} years ${months} months ${days} days`;
};

export const getSearchLocation = (address: string) => {
  return address.split(" ").join("+");
};
