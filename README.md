## api-test-suite-mocha

This repository contains API-TEST-SUITE for Sample Project

### Based on

This suite is currently based on:
- **Mocha:** `8.##.#` https://mochajs.org/
- **node-fetch** `2.##.#` https://www.npmjs.com/package/node-fetch

## Required software

Make sure nodejs is installed on your Operating system.
Install from the site - https://nodejs.org/en/  take the LTS version based on your Operating system. Please make sure you install NodeJS globally.
- **Node:** `v14.##.#`

### How to setup run test suite

Install the dependencies 
```
npm install
```

To run all the tests [This will by default run in parallel]
```
npm test
```

To run all the tests in serial mode
```
npm run serial
```

To run the stress test
```
npm run stress
```

Generated Report can be accessed from below path
```
/api-test-report/report.html
```

### Test Framework

<p align="center">
    <a href="https://github.com/himanshujane/api-test-suite-mocha/blob/main/docs/apiTestFramework.png">
        <img alt="API-TEST-SUITE" src="https://github.com/himanshujane/api-test-suite-mocha/blob/main/docs/apiTestFramework.png" width="546">
    </a>
</p>