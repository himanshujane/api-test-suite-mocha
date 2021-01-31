import chai, {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import tasksHelper from '../../../helper/tasks.helper.js'
import tasksData from '../../../dataProvider/tasks.data.js'
import endpoints from '../../../helper/endpoints.helper.js'
chai.use(require('chai-json-schema'))


describe('@API Test Getting All Tasks - Endpoint: ' + endpoints.getAllTasksURL, function () {
    var newUser
    var newTask1
    var newTask2

    before('Setting Prerequisite data', async function () {
        newUser = await authHelper.getNewUser()
    })

    tasksData._getAllTasks.validDataList.forEach(async function (reqData, index) {
        it(`Positive-Getting All the tasks: ${index+1} - ${reqData.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await tasksHelper.getAllTasks(this, newUser.token)

            //Asserting the Response
            assert.deepEqual(res.status, tasksData.status[200])

            //Asserting when there is no task
            if (index == 0) {
                assert.deepEqual(res.body.data, [])
                newTask1 = await tasksHelper.setNewTask(newUser.token)
            }

            //Asserting when there is only one task
            else if (index == 1) {
                assert.deepEqual(res.body.data[0], newTask1)
                newTask2 = await tasksHelper.setNewTask(newUser.token)
            }

            //Asserting when there are two tasks
            else {
                assert.jsonSchema(res.body, tasksData._getAllTasks.getAllTasksSchema)
                assert.deepEqual(res.body.data[0], newTask1)
                assert.deepEqual(res.body.data[1], newTask2)
                assert.isUndefined(res.body.data[2])
            }
        })
    })

    tasksData._getAllTasks.invalidDataList.forEach(async function (reqHeader, index) {
        it(`Negative-Getting all tasks given invalid Token: ${index+1} - ${reqHeader.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await tasksHelper.getAllTasks(this, reqHeader)

            //Asserting the Response
            assert.deepEqual(res.status, tasksData.status[401])
            assert.equal(res.body.message, tasksData.commonMsgs.unauthorized)
        })
    })
})