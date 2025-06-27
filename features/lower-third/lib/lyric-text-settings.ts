import { TextSettings } from "./type";

export const loadSettings = (): TextSettings => {
  if (typeof window === "undefined") {
    return { fontSize: "2rem", color: "#FFFFFF", textTransform: "uppercase" };
  }
  const raw = localStorage.getItem("lyricsSettings");
  return raw
    ? JSON.parse(raw)
    : { fontSize: "2rem", color: "#FFFFFF", textTransform: "uppercase" };
};
