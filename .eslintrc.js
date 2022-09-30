module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-uibub`
  extends: ["uibub"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
