import * as React from "react";

type Props = {
  className?: string
}

export const AppShell: React.FC<Props> = ({ className = '', children }) => {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
};
