export function parseDateToISO(date: string): string {
    // Create a new Date object using the input string
    const parsedDate = new Date(date);
    
    // Set the time to 23:59:59
    parsedDate.setHours(23, 59, 59, 0);
    
    // Convert the date to ISO format and remove milliseconds and timezone
    const isoString = parsedDate.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"
    
    return isoString;
  }


export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  