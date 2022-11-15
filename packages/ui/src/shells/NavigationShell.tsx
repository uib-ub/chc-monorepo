import * as React from "react";
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode
  className?: string
}

export const NavigationShell: React.FC<Props> = ({ className = '', children }) => {

  return (
    <nav className={`h-screen flex flex-col sticky top-0 shrink-0 gap-5 items-center p-2 z-20 ${className}`}>
      {children}
    </nav>
  );
};
