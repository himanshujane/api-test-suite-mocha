module.exports = {
    
    //Define specs for test execution.[array]
    spec: "test/specs/**/*.spec.js",
    
    //Show the difference between expected and actual values when an assertion failure is encountered [boolean]
    diff: true,

    //Specify a custom package.json location [string]
    package: './package.json',

    //Specify reporter to use [string]
    reporter: 'mochawesome',
    'reporter-option': [
        'overwrite=true',
        'reportTitle=API Test Report',
        'reportPageTitle=API Test Report',
        'showPassed=true'
    ],

    //Specify "slow" test threshold (in milliseconds) [number]
    slow: 200,

    //Specify test timeout threshold (in milliseconds) [number]
    timeout: 60000,

    //Specify user interface [string]
    ui: 'bdd',

    //Abort ("bail") after first test failure [boolean]
    bail: false,

    //Run tests in parallel [boolean]
    parallel: true,
    
    //Maximum jobs for parallel run [number]
    jobs: 10,

    //Retry failed tests this many times [number]
    //retries: 1
}