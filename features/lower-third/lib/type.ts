// types.ts
export type TextSettings = {
  fontSize: string;
  fontWeight: string;
  color: string;
  backgroundColor: string;
  backgroundTransparent: boolean;
  width: string;
  height: string;
  position: string;
  textTransform: React.CSSProperties["textTransform"];
  IPAddress: string;
  IPPort: number;
  Password: string;
}

export type WSConfig = {
  IPAddress: string;
  IPPort: number;
  Password: string;
  BackupIPAddress: string, // Optional
  BackupIPPort: number, // Optional
  BackupPassword: string, // Optional
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

