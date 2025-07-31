// import { format } from "date-fns";

export const loginDate = new Date().toLocaleString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

// export const timeRange = `${format(startTime, "hh:mm a")} - ${format(endTime, "hh:mm a")}`;
