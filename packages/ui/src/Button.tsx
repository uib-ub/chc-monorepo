import * as React from "react";

export const Button: React.FC = ({ children }) => {
  return (
    <div className="rounded-md bg-brandred">
      <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white no-underline hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-300 md:py-3 md:px-10 md:text-lg md:leading-6">
        {children}
        <span className="ml-2 bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent">
          →
        </span>
      </div>
    </div>
  );
};
