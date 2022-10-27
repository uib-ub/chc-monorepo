import * as React from "react";

type Props = {
  className?: string
}

export const NavigationShell: React.FC<Props> = ({ className = '', children }) => {

  return (
    <nav className={`flex align-center ${className}`}>
      {children}
    </nav>
  );
};
