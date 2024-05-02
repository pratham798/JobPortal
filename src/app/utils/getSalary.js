export const getSalary = (minJdSalary, maxJdSalary) => {
  if(minJdSalary && maxJdSalary) 
    return `Estimated Salary: ₹${minJdSalary} - ${maxJdSalary} LPA ⚠️`;
  else if(minJdSalary) 
    return `Estimated Salary: From ₹${minJdSalary} LPA ⚠️`;
  else if(maxJdSalary)
    return `Estimated Salary: Upto ₹${maxJdSalary} LPA ⚠️`;
  else return '';
}
