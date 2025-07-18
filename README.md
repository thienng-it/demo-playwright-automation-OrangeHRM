[![Playwright Tests](https://github.com/thienng-it/demo-playwright-automation-OrangeHRM/actions/workflows/e2e.tests.yml/badge.svg)](https://github.com/thienng-it/demo-playwright-automation-OrangeHRM/actions/workflows/e2e.tests.yml)
[![Allure Report](https://img.shields.io/badge/Allure%20Report-deployed-brightgreen)](https://thienng-it.github.io/demo-playwright-automation-OrangeHRM/)

# Demo Playwright Automation for OrangeHRM

This repository showcases a robust, scalable, and maintainable end-to-end test automation framework for the OrangeHRM application, built with Playwright and TypeScript.

## 📝 Table of Contents

- [About The Project](#about-the-project)
- [🚀 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [🧪 Test Cases](#test-cases)
- [CI/CD](#cicd)
- [📁 Folder Structure](#folder-structure)
- [🤝 Contributing](#contributing)
- [📜 License](#license)
- [✍️ Author](#author)
- [🎉 Acknowledgments](#acknowledgments)

## 🌟 About The Project

This project provides a comprehensive automated testing solution for the OrangeHRM platform. It's designed to be a practical example of a well-structured test automation framework, demonstrating best practices in testing and development.

### Key Features:

- **End-to-End Testing:** Covers critical user flows, including login, PIM (Personal Information Management), and admin functionalities.
- **Page Object Model (POM):** Utilizes the POM design pattern for better test maintenance and readability.
- **Data-Driven Testing:** Separates test data from test logic for easier test case management and scalability.
- **CI/CD Integration:** Integrated with GitHub Actions for continuous testing and reporting.
- **Detailed Reporting:** Generates comprehensive Allure reports for better test analysis and debugging.

### Built With:

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Allure Report](https://qameta.io/allure-framework/)
- [Node.js](https://nodejs.org/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download them from the official [Node.js website](https://nodejs.org/en/download/).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/thienng-it/demo-playwright-automation-OrangeHRM.git](https://github.com/thienng-it/demo-playwright-automation-OrangeHRM.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd demo-playwright-automation-OrangeHRM
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Install Playwright browsers:**
    ```sh
    npx playwright install
    ```

## Usage

You can execute the tests using various commands, depending on your needs.

- **Run all tests in headless mode:**
  ```sh
  npm test
  ```
- **Run all tests in headed mode:**
  ```sh
  npm run test:all:headed
  ```
- **Run tests on a specific browser (headless):**
  ```sh
  npm run test:chrome
  npm run test:firefox
  npm run test:webkit
  ```
- **Run tests on a specific browser (headed):**
  ```sh
  npm run test:chrome:headed
  npm run test:firefox:headed
  npm run test:webkit:headed
  ```
- **Run tests and generate/open an Allure report:**
  ```sh
  npm run test:allure
  ```

## 🧪 Test Cases

The test cases for this project are documented in a Google Sheet, which provides a detailed overview of the test scenarios and their expected outcomes.

🔗 **[View Test Cases](https://docs.google.com/spreadsheets/d/1jXi2Vakr6QWTMQlQon2ymEK025_eQ8FtvK2pNuZOtx0/edit?usp=sharing)**

The automated tests cover the following modules:

- **Login:** Includes tests for valid and invalid credentials, empty fields, special characters, case sensitivity, and security aspects like SQL injection and XSS.
- **PIM (Personal Information Management):** Covers adding a new employee and searching for an existing employee.
- **Global Search:** Tests the global search functionality in the sidebar with various inputs.

## CI/CD

This project uses **GitHub Actions** for continuous integration and deployment. The workflow is defined in the `.github/workflows/e2e.tests.yml` file and automates the testing process on every push to the repository.

The CI/CD pipeline includes the following steps:

1.  **Checkout:** Checks out the code from the repository.
2.  **Setup Node.js:** Sets up the specified version of Node.js.
3.  **Install Dependencies:** Installs all the necessary npm packages.
4.  **Run Tests:** Executes the Playwright tests and generates Allure reports.
5.  **Generate and Deploy Report:** Generates the Allure report and deploys it to GitHub Pages.

You can view the latest Allure report [here](https://thienng-it.github.io/demo-playwright-automation-OrangeHRM/).

## 📁 Folder Structure

The project follows a modular folder structure to ensure scalability and maintainability.
