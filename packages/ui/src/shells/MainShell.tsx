import { ReactNode } from 'react';

type Props = {
  children?: ReactNode
  className?: string
}

export const MainShell: React.FC<Props> = ({ children, className }) => {
  return (
    <main className={`min-h-screen flex flex-col flex-grow justify-between p-2 ${className}`}>
      {children}
    </main>
  );
};
