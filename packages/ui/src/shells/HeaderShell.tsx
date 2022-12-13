import * as React from "react";

type Props = {
  children: React.ReactNode
  Logo?: React.FC<React.SVGProps<SVGSVGElement>>
  className?: string
}

export const HeaderShell: React.FC<Props> = ({ Logo, className, children }) => {
  return (
    <header className={`flex gap-2 sm:rotate-180 sm:mb-2 sm:[writing-mode:vertical-rl] ${className} `}>
      {Logo ? (
        <div className='w-6 h-6'>
          <Logo />
        </div>
      ) : null}
      {children}
    </header >
  );
};
