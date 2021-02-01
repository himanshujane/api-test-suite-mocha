import chai, {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import tasksHelper from '../../../helper/tasks.helper.js'
import tasksData from '../../../dataProvider/tasks.data.js'
import endpoints from '../../../helper/endpoints.helper.js'
chai.use(require('chai-json-schema'))


describe('@API Test Deleting a given Task - Endpoint: ' + endpoints.deleteTaskURL("<id>"), function () {
    var _newUser = Object
    var _newTask = Object

    before('Setting Prerequisite data', async function () {
        _newUser = await authHelper.getNewUser()
        _newTask = await tasksHelper.setNewTask(_newUser.token)
    })

    it(`Positive-Deleting given Task`, async function () {

        //Making API request and saving response in a variable
        const res = await tasksHelper.deleteTask(this, _newUser.token, _newTask.id)

        //Asserting the Response
        assert.deepEqual(res.status, tasksData.status[204])
    })

    tasksData._deleteTask.invalidDataList.forEach(async function (test, index) {
        it(`Negative-Deleting given invalid task: ${index+1} - ${test.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await tasksHelper.deleteTask(this, _newUser.token, test.taskId)

            //Asserting the Response
            assert.deepEqual(res.status, tasksData.status[404])
            assert.equal(res.body.message, tasksData.commonValues.invalidData)
        })
    })
})