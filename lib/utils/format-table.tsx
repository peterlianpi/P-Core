export const CenteredCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center truncate text-center items-center">
      {children}
    </div>
  );
};

export const LeftCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center text-left truncate">
      {children}
    </div>
  );
};

export const RightCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center text-right truncate">
      {children}
    </div>
  );
};
