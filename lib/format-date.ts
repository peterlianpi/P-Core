import { format, parseISO } from "date-fns";

// Utility function to format date to dd/mm/yyyy
export const formatDate = (date: Date | null) => {
  if (!date) return null;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Convert date to UTC
export const formattedDateUTC = (date: Date | undefined): string | undefined => {
  if (!date) return undefined;

  // Convert to UTC and return as an ISO string
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return utcDate.toISOString(); // ISO string in UTC format
};


export const convertUTCtoLocal = (utcDate: string | undefined): string | undefined => {
  if (!utcDate) return undefined;

  // Parse the ISO string (UTC)
  const parsedDate = parseISO(utcDate);

  // Format to local time using the format you desire (e.g., MM/dd/yyyy)
  return format(parsedDate, 'yyyy/MM/dd'); // Adjust format as needed
};



