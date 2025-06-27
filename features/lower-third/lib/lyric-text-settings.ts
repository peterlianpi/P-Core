import { TextSettings } from "./type";

const SETTINGS_KEY = "lower-third-settings";

export function loadSettings(): TextSettings {

  if (typeof window === "undefined") {
    // SSR-safe fallback
    return {
      fontSize: "30px",
      fontWeight: "600",
      color: "#ffffff",
      backgroundColor: "#000000",
      backgroundTransparent: true,
      width: "100%",
      height: "auto",
      position: "bottom",
      textTransform: "none",
      IPAddress: "localhost",
      IPPort: 8080,
      Password: "Pro12345",
    };
  }

  const data = localStorage.getItem(SETTINGS_KEY);
  return data
    ? JSON.parse(data)
    : {
      fontSize: "30px",
      fontWeight: "600",
      color: "#ffffff",
      backgroundColor: "#000000",
      backgroundTransparent: true,
      width: "100%",
      height: "auto",
      position: "bottom",
      textTransform: "none",
      IPAddress: "localhost",
      IPPort: 8080,
      Password: "Pro12345",
    };
}

export function saveSettings(settings: TextSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
