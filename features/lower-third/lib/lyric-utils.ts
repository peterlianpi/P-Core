import { CleanConfig } from "./type";

export const cleanLyricText = (text: string, config: CleanConfig): string[] => {
  let processed = text.replace(/\r\n|\r/g, "\n").trim();

  processed = processed.replace(
    /[\u00A0-\u9999<>\&]/gim,
    (i) => `&#${i.charCodeAt(0)};`
  );
  processed = processed.replace(/&#8232;/g, "\n");
  processed = processed.replace(
    /([0-9]+)([A-Za-z]+)/,
    (_, num, word) => `<span class="verse-ref">${num}</span> ${word}`
  );

  if (config?.SplitLines) {
    const parts = processed.split(config.SplitLines);
    processed = parts[config.SplitLinesNum ?? 0] ?? processed;
  }

  return processed
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};
