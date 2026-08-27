# 🎭 Playwright Course

Learning **QA Automation with Playwright and JavaScript** through practical exercises and hands-on testing.

This repository contains the exercises and examples created while progressing through a Playwright Automation course.

## 🚀 Tech Stack

* Playwright
* JavaScript
* Node.js
* Git
* GitHub
* GitHub Actions

## 📚 Current Progress

Topics covered so far:

* Playwright project setup
* Playwright Test basics
* Browser fixture
* Page fixture
* Browser Context
* Creating pages with `context.newPage()`
* Navigation with `page.goto()`
* Asynchronous execution with `async` / `await`
* Running specific tests with `test.only()`
* Skipping tests with `test.skip()`
* Running tests in headed mode
* Playwright debug mode

## 📁 Project Structure

```text
playwright-course/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── tests/
│   ├── example.spec.js
│   └── UIBasicTest.spec.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js
```

## ▶️ Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests while displaying the browser:

```bash
npx playwright test --headed
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

## 🎯 Goal

The goal of this repository is to build practical QA Automation skills with Playwright, starting with JavaScript fundamentals and progressively learning more advanced automation concepts and framework design.

The repository will evolve as I progress through the course.
