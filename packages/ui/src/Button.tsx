import * as React from "react";

export const Button: React.FC = ({ children }) => {
  return (
    <div className="rounded-md">
      <div className="flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium no-underline md:py-3 md:px-10 md:text-lg md:leading-6">
        {children}
        <span className="ml-2">
          →
        </span>
      </div>
    </div>
  );
};
