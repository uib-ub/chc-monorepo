import { ReactNode } from 'react';
import { cva, VariantProps } from "class-variance-authority";

export const paneStyles = cva([], {
  variants: {
    intent: {
      sidebar: [
        "h-screen",
        "sticky",
        "flex",
        "flex-col",
        "gap-5",
        "items-center",
        "shrink-0",
        "top-0",
        "z-20",
        "p-2",
        "max-md:pt-3",
        "md:pt-5",
        "bg-gray-200",
        "dark:bg-[#35393a]",
      ],
      // **or**
      // primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
      aside: [
        "max-md:flex",
        "md:flex",
        "flex-col",
        "gap-5",
        "p-3",
        "pb-1",
        "md:p-5",
        "md:pb-2",
        "md:h-screen",
        "md:sticky",
        "md:top-0",
        "md:w-72",
        "md:shrink",
        "md:flex-grow-0",
        "max-sm:p-5",
        "md:bg-gray-100",
        "md:dark:bg-[#2b2e2f],"
      ],
      content: [
        "min-h-screen",
        "flex",
        "flex-col",
        "flex-grow",
        "p-3",
        "md:p-5",
        "md:pb-2",
        "bg-white",
        "dark:bg-[#1a1d1e]"
      ]
    },
  },
  defaultVariants: {
    intent: "content",
  },
});


type PaneProps = {
  children?: ReactNode
}

interface Props extends PaneProps, VariantProps<typeof paneStyles> { }

export const Pane = ({ intent, children }: Props) => {
  return (
    <div className={paneStyles({ intent })}>
      {children}
    </div>
  );
};