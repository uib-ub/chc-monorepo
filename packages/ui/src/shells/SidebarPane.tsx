import { ReactNode } from 'react';

type Props = {
  children?: ReactNode
  className?: string
}

export const SidebarPane: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`${className} h-screen sticky flex flex-col gap-5 items-center shrink-0 top-0 z-20 p-2 max-md:pt-3 md:pt-5 bg-gray-200 dark:bg-[#35393a]`}>
      {children}
    </div>
  );
};
