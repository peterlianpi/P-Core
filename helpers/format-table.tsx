export const CenteredCell = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-center">{children}</div>;
};

export const LeftCell = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-left">{children}</div>;
};

export const RightCell = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-right">{children}</div>;
};
