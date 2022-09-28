# Cultural Heritage Collections @ UiB-UB

This is a monorepo containing the web exhibitions published by UiB-UB.

## What's inside?

This Turborepo uses [pnpm](https://pnpm.io) as a packages manager. It includes the following packages/apps:

### Apps

- `docs`: a [Next.js](https://nextjs.org) app
- `exh-nt`: the exhibition _Neverending and temporary_, a [Next.js](https://nextjs.org) app
- `exh-nt-studio`: the headless CMS for _Neverending and temporary_, a [Sanity](https://sanity.io) Studio

### Packages

- `ui`: a stub React component library shared by both the `apps` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

```sh
git clone ...
cd choc-monorepo
```

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```

### Useful commands

Examples here use `pnpm`, but this is easy to fudge up. It is recomended to create an alias: `alias pn:"pnpm"`.

* pnpm add -Wd <package> – Add package to root (mainly for devDependencies)
* pnpm add <package> --filter <workspace> – Add package to workspace
* pnpm remove <package> --filter <workspace> – Remove package to workspace
* pnpm update <package> --filter <workspace> – Update package to workspace
* pnpm install
* pnpm build - Build all packages and apps
* pnpm dev - Develop all packages and apps
* pnpm lint - Lint all packages
* pnpm changeset - Generate a changeset
* pnpm clean - Clean up all node_modules and dist folders (runs each package's clean script)

### Changesets

```sh
# Create feature branch
# Commit change(s)
# Merge
pnpm run changeset
# Answer the questions
git add . && git commit -m "<message>"
git push
# New PR should have been created by Github Action
git fetch && git reset --hard origin/main
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
