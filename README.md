# asyncmailingform
Simple async mailing form that requires the user to enter a valid email address. After the user clicks on the "Sign up" button, the email gets sent to a third-party server via fetch.

# Features
* Email validation using Regex.
* Asynchronously send email address to third-party server using Fetch API.

# Installation
1. Clone or download the repository.
2. Install yarn globally (if you don't have it installed already).
3. Run `yarn install` in your local project directory to install dev dependencies.
4. Use the `public` folder as your root folder.

# Contributing
1. Create a local branch from master branch.
2. Make changes in the `/public/index.html` file or in the `/resources` folder.
3. Run `yarn gulp deploy` to generate the build.
4. Update the README.md with details of the changes made.
5. Submit a PR merging your branch into master.