import { ReactNode } from 'react';

type Props = {
  children?: ReactNode
  className?: string
}

export const ContentShell: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`${className} min-h-screen flex flex-col flex-grow p-3 md:p-5 md:pb-2 bg-white dark:bg-[#1a1d1e]`}>
      {children}
    </div>
  );
};
