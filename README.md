# Ultralytics QA Automation (TS/Playwright)

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

## Viewing Test Reports
For detailed Allure reports:

Install Allure Commandline (if not installed):
- `npm install -g allure-commandline --save-dev`
Generate and Open Report (after any test run):
- `allure generate allure-results --clean && allure open`


## Notes
- Adapted to TypeScript/Playwright workflow (per assignment POM/automation reqs).

