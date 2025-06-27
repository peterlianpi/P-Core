"use client";

import React, { useState, useCallback } from "react";
import { ProPresenterMessage, TextSettings } from "../lib/type";

import { useProPresenterWS } from "../lib/use-propresenter-ws";
import { cleanLyricText } from "../lib/lyric-utils";

interface LyricsDisplayProps {
  settings: TextSettings;
}

export default function LyricsDisplay({ settings }: LyricsDisplayProps) {
  const [lines, setLines] = useState<string[]>([]);

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
      IPAddress: settings?.IPAddress || "127.0.0.1",
      IPPort: settings?.IPPort || 8080,
      Password: settings?.Password || "Pro12345",
      BackupIPAddress: "localhost", // Optional
      BackupIPPort: 8088, // Optional
      BackupPassword: "Pro12345", // Optional
      ClockLocale: "en-US",
    },
    handleMessage
  );

  return (
    <div
      style={{
        fontSize: settings?.fontSize || "30px",
        fontWeight: settings?.fontWeight || "bold",
        color: settings?.color || "white",
        textTransform: settings?.textTransform || "capitalize",
        backgroundColor: settings?.backgroundTransparent
          ? "transparent"
          : settings?.backgroundColor || "transparent",
        width: settings?.width || "100%",
        height: settings?.height || "auto",
      }}
      className={`absolute mx-auto ${
        settings?.position === "bottom"
          ? "bottom-0"
          : settings?.position === "center"
          ? "top-1/2 -translate-y-1/2"
          : "top-0"
      } text-center`}
    >
      {lines.length > 0 ? (
        lines.map((line, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: line }} />
        ))
      ) : (
        <>
          <p>First Line Lyrics</p>
          <p>Second Line Lyrics</p>
          <p>Third Line Lyrics</p>
          <p>Fouth Line Lyrics</p>
        </>
      )}
    </div>
  );
}
