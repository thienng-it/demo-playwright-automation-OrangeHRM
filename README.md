# Demo Playwright Automation for OrangeHRM

This project provides an end-to-end automation framework for testing the OrangeHRM application. It is designed to demonstrate proficiency in test case documentation, scalable framework architecture, and hands-on automation.

## Table of Contents

- [About The Project](https://www.google.com/search?q=%23about-the-project)
- [Getting Started](https://www.google.com/search?q=%23getting-started)
  - [Prerequisites](https://www.google.com/search?q=%23prerequisites)
  - [Installation](https://www.google.com/search?q=%23installation)
- [Usage](https://www.google.com/search?q=%23usage)
- [Test Cases](https://www.google.com/search?q=%23test-cases)
- [CI/CD](https://www.google.com/search?q=%23cicd)
- [Author](https://www.google.com/search?q=%23author)
- [Acknowledgments](https://www.google.com/search?q=%23acknowledgments)

## About The Project

This project is an automated testing solution for the OrangeHRM platform, built using Playwright. It covers various functionalities, including:

- **Login**: Testing valid and invalid login credentials, edge cases, and security vulnerabilities.
- **PIM (Personal Information Management)**: Adding and searching for employees.
- **System Users**: Navigating to the system users page and adding new users.

### Built With

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Allure](https://www.google.com/search?q=https://qameta.io/allure-framework/) for reporting

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need to have Node.js and npm installed on your machine. You can download them from [here](https://nodejs.org/en/download/).

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/thienng-it/demo-playwright-automation-OrangeHRM.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```

## Usage

You can run the tests using the following commands:

- Run all tests:
  ```sh
  npm test
  ```
- Run tests in headed mode:
  ```sh
  npm run test:all:headed
  ```
- Run tests on a specific browser:
  ```sh
  npm run test:chrome
  npm run test:firefox
  npm run test:webkit
  ```
- Run tests and generate an Allure report:
  ```sh
  npm run test:allure
  ```

## Test Cases

The test cases for this project are documented in a Google Sheet, which you can access here: [Test Cases](https://docs.google.com/spreadsheets/d/1jXi2Vakr6QWTMQlQon2ymEK025_eQ8FtvK2pNuZOtx0/edit?usp=sharing)

## CI/CD

This project uses GitHub Actions for continuous integration and deployment. The workflow is defined in the `.github/workflows/e2e.tests.yml` file and includes the following steps:

- **Checkout**: Checks out the code from the repository.
- **Setup Node.js**: Sets up the specified version of Node.js.
- **Install Dependencies**: Installs the necessary npm packages.
- **Run Tests and Generate Allure Reports**: Executes the Playwright tests and generates Allure reports.
- **Get Allure History**: Retrieves the Allure history from the `gh-pages` branch.
- **Allure Report Action**: Generates the Allure report.
- **Deploy Report to GitHub Pages**: Deploys the Allure report to GitHub Pages.

## Author

- **Nguyen Thai Minh Thien** - _Author_

## Acknowledgments

- This project was created as part of an evaluation of test automation skills.
- The project utilizes the [Faker.js](https://fakerjs.dev/) library to generate fake data for testing purposes.
