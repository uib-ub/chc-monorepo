import * as React from "react";

export const AppShell: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col justify-center h-screen bg-red-200 p-5">
      {children}
    </div>
  );
};
