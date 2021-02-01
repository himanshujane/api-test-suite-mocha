import {
    assert
} from 'chai'
import authHelper from '../../helper/auth.helper.js'
import tasksHelper from '../../helper/tasks.helper.js'
import tasksData from '../../dataProvider/tasks.data.js'
import endpoints from '../../helper/endpoints.helper.js'

describe('@STRESS Test Getting All Tasks - Endpoint: ' + endpoints.getAllTasksURL, function () {

    var lowest = 20000
    var highest = 0
    var startTime = Number
    var endTime = Number
    var newUser = Object
    var newTask1 = Object
    let i = 1

    before('Setting Prerequisite data', async function () {
        newUser = await authHelper.getNewUser()
        newTask1 = await tasksHelper.setNewTask(newUser.token)
    })

    beforeEach("Starting the timer", function () {
        startTime = new Date().getTime()
    })

    afterEach("Endign the timer and calculating lowest and hightest time", function () {
        endTime = new Date().getTime()
        let diff = endTime - startTime
        if (diff > highest) {
            highest = diff
        } else if (diff < lowest) {
            lowest = diff
        }
    })

    after("Printing Lowest and Highest time taken by API", function () {

        console.log("Lowest is : ", lowest)
        console.log("Highest is : ", highest)
    })


    while (i <= 20) {
        it(`Getting All Tasks - Iteration: ${i}`, async function () {

            //Making API request and saving response in a variable
            const res = await tasksHelper.getAllTasks(this, newUser.token)

            //Asserting the Response
            assert.deepEqual(res.status, tasksData.status[200])
        })
        i++
    }
})