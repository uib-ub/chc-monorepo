// src/Button.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Button = ({ children }) => {
  return /* @__PURE__ */ jsx("div", {
    className: "rounded-md bg-brandred",
    children: /* @__PURE__ */ jsxs("div", {
      className: "flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white no-underline hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-300 md:py-3 md:px-10 md:text-lg md:leading-6",
      children: [
        children,
        /* @__PURE__ */ jsx("span", {
          className: "ml-2 bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent",
          children: "\u2192"
        })
      ]
    })
  });
};

// src/shells/AppShell.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var AppShell = ({ children }) => {
  return /* @__PURE__ */ jsx2("div", {
    className: "flex flex-col justify-center h-screen bg-red-200 p-5",
    children
  });
};
export {
  AppShell,
  Button
};
