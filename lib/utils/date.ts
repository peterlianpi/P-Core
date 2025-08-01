import { format, parseISO } from "date-fns";

/**
 * Format a Date object to dd/mm/yyyy string.
 * @param date - Date object or null
 * @returns Formatted date string or null
 */
export const formatDate = (date: Date | null) => {
  if (!date) return null;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Convert a Date object to UTC ISO string (yyyy-mm-ddT00:00:00.000Z)
 * @param date - Date object or undefined
 * @returns UTC ISO string or undefined
 */
export const formattedDateUTC = (date: Date | undefined): string | undefined => {
  if (!date) return undefined;
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return utcDate.toISOString();
};

/**
 * Convert a UTC ISO string to local date string (yyyy/MM/dd)
 * @param utcDate - UTC ISO string or undefined
 * @returns Local formatted date string or undefined
 */
export const convertUTCtoLocal = (utcDate: string | undefined): string | undefined => {
  if (!utcDate) return undefined;
  const parsedDate = parseISO(utcDate);
  return format(parsedDate, 'yyyy/MM/dd');
};

/**
 * Format the current date and time for login display (en-US, long format)
 * @returns Formatted date string
 */
export const loginDate = new Date().toLocaleString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
