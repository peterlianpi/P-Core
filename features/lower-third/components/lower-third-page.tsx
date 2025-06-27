"use client";

import LyricsDisplay from "@/features/lower-third/components/lower-third-display";
import { loadSettings } from "@/features/lower-third/lib/lyric-text-settings";
import { TextSettings } from "@/features/lower-third/lib/type";
import React, { useEffect, useState } from "react";
import { useData } from "../data/data-provider";

function LowerThirdPage() {
  const { isUpdated, setIsUpdated } = useData();
  const [settings, setSettings] = useState<TextSettings>(() => loadSettings());

  useEffect(() => {
    if (isUpdated) {
      const updated = loadSettings();
      setSettings(updated);
      setIsUpdated(false); // Reset flag
    }
  }, [isUpdated, setIsUpdated]);

  useEffect(() => {
    const onStorageChange = (e: StorageEvent) => {
      if (e.key === "lower-third-settings") {
        setSettings(loadSettings());
      }
    };
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return (
    <div className="w-full flex justify-center items-center text-center bg-transparent text-white h-[98vh] relative p-4 mx-auto">
      <LyricsDisplay settings={settings} />
    </div>
  );
}

export default LowerThirdPage;
