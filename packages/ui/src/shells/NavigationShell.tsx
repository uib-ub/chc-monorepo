import * as React from "react";
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode
  className?: string
}

export const NavigationShell: React.FC<Props> = ({ className = '', children }) => {

  return (
    <nav className={`flex align-center ${className}`}>
      {children}
    </nav>
  );
};
