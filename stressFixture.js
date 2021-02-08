//import fs from 'fs'
const fs = require('fs')

//Number of parallel users
var _userCount = 5
var _fileName = "ST3.01.getAllTasks"
var _tempStressFolder = "./test/specs/03_stressTests/stress"

/**
 * This creates a new folder by name stress and create given number of duplicate files of stress test.
 */
module.exports.prepare = function () {

    if (!fs.existsSync(_tempStressFolder)) {
        fs.mkdir("./test/specs/03_stressTests/stress", (err) => {
            if (err) throw err
        })
    }

    let counter = 1
    while (counter <= _userCount) {
        fs.copyFile(`./test/specs/03_stressTests/${_fileName}.spec.js`, `${_tempStressFolder}/stress_TEST_${counter}.spec.js`, function (err) {
            if (err) throw err
        })
        counter++
    }
    console.log(`${_userCount} tests created`)
}


/**
 * This deletes the 'stress' folder and prints stats
 */
module.exports.destroy = function () {

    var lowest = 30000
    var highest = 0
    var totalTimeTaken = 0

    //Deletes folder 'stress'
    fs.rmdir(_tempStressFolder, {
        recursive: true
    }, (err) => {
        if (err) {
            throw err;
        }
        console.log(`Folder "stress" is deleted!`);
    })

    //Reads report.json file and prints stats
    fs.readFile('./api-test-report/report.json', 'utf-8', function (err, data) {
        if (err) throw err

        var result = JSON.parse(data)

        result.results[0].suites.forEach(function (listOfScripts, index) {

            listOfScripts.tests.forEach(function (listOfTests, index) {

                let timeTaken = listOfTests.duration
                if (timeTaken > highest) highest = timeTaken
                if (timeTaken < lowest) lowest = timeTaken
                totalTimeTaken += timeTaken
            })
        })
        let mean = totalTimeTaken / result.stats.testsRegistered
        console.log(`Lowest : ${lowest} | Highest : ${highest} | Mean : ${mean}`)
    })
}