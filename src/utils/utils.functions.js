
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