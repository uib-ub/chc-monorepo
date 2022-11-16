import { ReactNode } from 'react';

type Props = {
  children?: ReactNode
  className?: string
}

export const MetaPane: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`${className} md:flex flex-col gap-5 p-3 pb-1 md:p-5 md:pb-2`}>
      {children}
    </div>
  );
};
