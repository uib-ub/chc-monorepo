import { ReactNode } from 'react';

type Props = {
  children?: ReactNode
  className?: string
}

export const AppShell: React.FC<Props> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};
