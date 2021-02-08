import {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import tasksHelper from '../../../helper/tasks.helper.js'
import tasksData from '../../../dataProvider/tasks.data.js'
import endpoints from '../../../helper/endpoints.helper.js'

describe('@STRESS Test Getting All Tasks - Endpoint: ' + endpoints.getAllTasksURL, function () {

    var _newUser = Object
    var _newTask1 = Object
    let loopCount = 1

    before('Setting Prerequisite data', async function () {
        _newUser = await authHelper.getNewUser()
        _newTask1 = await tasksHelper.setNewTask(_newUser.jsonToken)
    })


    while (loopCount <= 10) {
        it(`Getting All Tasks - Iteration: ${loopCount}`, async function () {

            //Making API request and saving response in a variable
            const res = await tasksHelper.getAllTasks(this, _newUser.jsonToken)

            //Asserting the Response
            assert.deepEqual(res.status, tasksData.status[200])
        })
        loopCount++
    }
})

//Users|Low | High | Mean
// 1  - 160 | 2157 | 574
// 2  - 146 | 1319 | 360
// 5  - 177 | 1367 | 423
// 10 - 373 | 1636 | 748
// 20 - 813 | 2445 | 1453
// 30 - 1226| 3113 | 2020