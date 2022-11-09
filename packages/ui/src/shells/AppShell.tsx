import * as React from "react";

type Props = {
  className?: string
}

export const AppShell: React.FC<Props> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};
