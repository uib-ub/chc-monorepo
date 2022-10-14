"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  AppShell: () => AppShell,
  Button: () => Button
});
module.exports = __toCommonJS(src_exports);

// src/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = ({ children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "rounded-md bg-brandred",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white no-underline hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-300 md:py-3 md:px-10 md:text-lg md:leading-6",
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
          className: "ml-2 bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent",
          children: "\u2192"
        })
      ]
    })
  });
};

// src/shells/AppShell.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var AppShell = ({ children }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
    className: "flex flex-col justify-center h-screen bg-red-200 p-5",
    children
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppShell,
  Button
});