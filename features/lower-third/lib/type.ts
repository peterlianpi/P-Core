// types.ts
export type TextSettings = {
  fontSize: string;
  color: string;
  textTransform: React.CSSProperties["textTransform"];
};

export type WSConfig = {
  IPAddress: string;
  IPPort: number;
  Password: string;
  ClockLocale: string;
};

export type Entry = {
  acn: string;
  txt: string;
};

export type ProPresenterMessage = {
  acn: string;
  ary: Entry[];
};

export type CleanConfig = {
  SplitLines?: string;
  SplitLinesNum?: number;
};
