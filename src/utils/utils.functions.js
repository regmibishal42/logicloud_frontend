
export const DateFormatter = (date) =>{
    const unFormattedDate = new Date(date);
    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      };
   
return unFormattedDate.toLocaleDateString('en-US', options); 
}