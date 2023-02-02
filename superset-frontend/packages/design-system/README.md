# Superset Design System
This Package is a React web development design system containing the foundations and components to build frontend applications for Apache Superset.

## Purpose
- Increase efficiency of developing Superset applications
- Increased visibility for re-usable components
- Clear documentation and examples
- Improve consistency of the user experience
- Identify appropriate and undesirable use cases for components

## Use Case
This package is able to be used by any package, plugin, or code in superset-frontend/src.  In it's current form it does not yet support publishing for external use outside of the Superset mono repo.  That use case will be addressed at a future date.

The design system has no dependencies to other packages or source code in the superset mono repo outside of what is defined in the `superset/superset-frontend/packages/design-system` so it is safe to use without concerns of create circular dependency chains while working on other superset packages, plugins and source code.

## How to use
The full documentation for the Superset Design System is built in Storybook.  You can access this documentation from a published online resource, or build and view in your local development environment.

### Accessing Online
As the design system code base changes and gets merged to the `master` branch, a github actions publishes the latest version to Chromatic.  

The online published resource can be viewed at [Superset Design System Latest](https://feature-design-system--63db10cca3deb27848311fc6.chromatic.com/)

NOTE: This represents the version published from the Apache superset master branch.  If you want the version specific to your branch, especially if doing work such as a patch release off a tagged version of Superset, please use the docs in your local dev environment.

### Local Dev Environment
The pre requisites for running and developing in the `design-system` package are that you have  a local installation of Node.js based on the version in the `engines` section of the package.json.

If you already have a functional Superset local dev environment for frontend development you do not need to change anything.

To run a local view of the Storybook documentation:
1. Open a terminal at `superset/superset-frontend/packages/design-system`
2. run `npm ci`
3. run `npm run storybook`

The configuration to use resources and components form design system in the other superset-frontend code is already setup and requires no special configuration.  Take a look at the documentation and follow the instructions on how to import and use the different resources in your code exposed as `@superset/design-system` by the mono repo configuration.

## Contributing
Contributing to the `design-system` follows the same community and code standards as contributing to Superset Frontend.  There are specific guidelines that superceded Superset guidelines defined in the `Contributing` documentation