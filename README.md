# Ultralytics QA Automation (TS/Playwright)

Project Overview

The primary goal of this project was to demonstrate proficiency in both manual and automation testing. The assignment was divided into two main phases:

Phase 1: Manual Testing : A thorough manual testing process was conducted on the QA Playground platform, resulting in the discovery and documentation of 10 bugs, including a critical Cross-Site Scripting (XSS) vulnerability. A detailed bug report is included in the final submission.

Phase 2: Automation Testing : A robust automation framework was developed using Playwright and TypeScript to test the Ultralytics HUB Beta platform. The framework follows the Page Object Model (POM) design pattern for maintainability and scalability.

## Prerequisites
- Signed up on https://hub.ultralytics.com/ 
- Download Coco8.zip
- Created a repo

## Setup
1. `npm install`
2. Update `config/test.config.ts` with creds: `nathan_oj@outlook.com`, `Aaaa1111.`
3. Unzip `coco8.zip` to `data/` for `.yaml`. (datasetPath: './data/coco8.zip')
4. Install YOLO CLI: `pip3 install ultralytics`
5. `npx playwright install`

## Run Tests
- Smoke: `npm run test:headed`
- Scenario 1 - Upload Dataset: `npm run test:upload`
- Scenario 2 - Train Model: `npm run test:train`
- Reports: `npm run allure:open`
- All Tests: npx playwright test --headed

## Test Outputs
Running 4 tests using 3 workers
  ✓ Login to dashboard (4.8s)
  ✓ Upload Dataset (15.4s)
  ✓ Train Model workflow (25.4s)
  1 skipped (advanced Python execution)
3 passed (26.3s)


## Test Reporting

Allure Report 
For more detailed and historical reports, Allure is integrated. 

Install Allure Commandline (if not installed):
- `npm install -g allure-commandline --save-dev`

Run tests (generates allure-results)
- `npx playwright test`

Generate Report  
`allure generate allure-results --clean -o allure-report`

Open the report in your browser:
-  `allure open allure-report`

Standard HTML report
- `npx playwright show-report`


## Directory Structure
.
├── pages/                # Page Object Model classes
│   ├── base.page.ts
│   ├── dashboard.page.ts
│   ├── login.page.ts
│   └── train.page.ts
├── tests/                # Test specification files
│   ├── example.spec.ts
│   ├── test-train-model.spec.ts
│   └── test-upload-dataset.spec.ts
├── playwright.config.ts    # Playwright configuration
├── package.json            # Project dependencies
└── README.md               # This file



Key Achievements
✅ Complete automation framework built with Playwright + TypeScript
✅ Page Object Model design for maintainability
✅ All tests passing reliably and consistently
✅ Robust element selectors using semantic HTML
✅ Proper wait strategies for dynamic content
✅ Python code extraction from BYO Agent page
✅ Comprehensive documentation for easy understanding


