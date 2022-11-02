import * as React from "react";

type Props = {
  logo?: React.SVGProps<SVGElement>
  className?: string
}

export const HeaderShell: React.FC<Props> = ({ logo, className, children }) => {

  return (
    <header className={`flex align-center gap-2 ${className}`}>
      {logo && (
        <div className='w-6 h-6'>
          {logo}
        </div>
      )}
      {children}
    </header>
  );
};
