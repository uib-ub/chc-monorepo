import * as React from "react";

type Props = {
  children: React.ReactNode
  logo?: React.SVGProps<SVGElement>
  className?: string
}

export const HeaderShell: React.FC<Props> = ({ logo, className, children }) => {

  return (
    <header className={`flex gap-2 rotate-180 ${className}`} style={{ writingMode: 'vertical-rl' }} >
      {/* {logo && (
        <div className='w-6 h-6'>
          {logo}
        </div>
      )} */}
      {children}
    </header >
  );
};
