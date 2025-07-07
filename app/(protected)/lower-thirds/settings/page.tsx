"use client";

import { useEffect, useState } from "react";
import LowerThirdSettings from "@/features/lower-third/components/lower-third-settings";
import { TextSettings } from "@/features/lower-third/lib/type";
import {
  loadSettings,
  saveSettings,
} from "@/features/lower-third/lib/lyric-text-settings";
import { useData } from "@/features/lower-third/data/data-provider";

export default function SettingsPage() {
  const { setIsUpdated } = useData();
  const [settings, setSettings] = useState<TextSettings>();

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
  }, []);

  const handleSettingsChange = (newSettings: TextSettings) => {
    saveSettings(newSettings); // Save to localStorage
    setSettings(newSettings); // Update local state
    setIsUpdated(true); // Notify listener
  };

  if (!settings)
    return <div className="flex items-center justify-center">Loading...</div>;

  return (
    <div className="w-fit mx-auto items-center p-2">
      <LowerThirdSettings
        settings={settings}
        setSettings={handleSettingsChange}
      />
    </div>
  );
}
