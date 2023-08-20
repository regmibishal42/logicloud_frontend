
export const DateFormatter = (date) =>{
    const unFormattedDate = new Date(date);
    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      };
   
return unFormattedDate.toLocaleDateString('en-US', options); 
}

export const ServerDateFormatter = (inputDate)=> {
  const dateParts = inputDate.split('-');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript
  const day = parseInt(dateParts[2]);

  const convertedDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
  const isoString = convertedDate.toISOString();

  return isoString;
}

export const CheckSameObjects = (obj1, obj2) =>{
  console.log("first obj",obj1)
  console.log("second obj",obj2)
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}