export function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Extract the components
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month (0-based, so add 1)
  const day = String(date.getDate()).padStart(2, "0"); // Day
  const year = String(date.getFullYear()).slice(-2); // Last two digits of the year
  const hours = date.getHours(); // Hour
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Minutes
  const seconds = String(date.getSeconds()).padStart(2, "0"); // Seconds

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = String(hours % 12 || 12).padStart(2, "0"); // Convert to 12-hour format

  // Format the final string
  return `${month}/${day}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
}
