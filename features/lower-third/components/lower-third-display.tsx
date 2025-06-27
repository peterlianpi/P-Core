// LyricsDisplay.tsx
"use client";

import React, { useState, useCallback } from "react";
import { ProPresenterMessage, TextSettings } from "../lib/type";

import { useProPresenterWS } from "../lib/use-propresenter-ws";
import { loadSettings } from "../lib/lyric-text-settings";
import { cleanLyricText } from "../lib/lyric-utils";

export default function LyricsDisplay() {
  const [lines, setLines] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [settings, setSettings] = useState<TextSettings>(() => loadSettings());

  const handleMessage = useCallback((msg: ProPresenterMessage) => {
    if (msg.acn === "fv") {
      msg.ary.forEach((entry) => {
        if (entry.acn === "cs") {
          const cleanedLines = cleanLyricText(entry.txt, {});
          setLines(cleanedLines);
        }
      });
    }
  }, []);

  useProPresenterWS(
    {
      IPAddress: "localhost",
      IPPort: 80,
      Password: "Pro12345",
      ClockLocale: "en-US",
    },
    handleMessage
  );

  return (
    <div
      style={{
        fontSize: settings.fontSize,
        color: settings.color,
        textTransform: settings.textTransform,
      }}
      className="font-semibold w-full absolute bottom-0 mx-auto"
    >
      {lines.map((line, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: line }} />
      ))}

      <p>Line one lyric</p>
      <p>Line two lyric</p>
    </div>
  );
}
