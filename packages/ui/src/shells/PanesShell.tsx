import { ReactNode } from 'react';

type Props = {
  children?: ReactNode
  className?: string
}

export const PanesShell: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex'>
      {children}
    </div>
  );
};
