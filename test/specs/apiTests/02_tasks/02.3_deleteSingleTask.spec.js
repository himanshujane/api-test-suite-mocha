import chai, {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import tasksHelper from '../../../helper/tasks.helper.js'
import tasksData from '../../../dataProvider/tasks.data.js'
import endpoints from '../../../helper/endpoints.helper.js'
chai.use(require('chai-json-schema'))


describe('Test Deleting a given Task - Endpoint: ' + endpoints.deleteTaskURL("<id>"), function () {
    var newUser
    var newTask

    before('Setting Prerequisite data', async function () {
        newUser = await authHelper.getNewUser()
        newTask = await tasksHelper.setNewTask(newUser.token)
    })

    it(`Positive-Deleting given Task`, async function () {

        let reqData = {
            id: newTask.id,
            token: newUser.token
        }
        //Making API request and saving response in a variable
        var res = await tasksHelper.deleteTask(this, reqData)

        //Asserting the Response
        assert.equal(res.status, tasksData.status.status204)
        assert.equal(res.statusText, tasksData.status.status204Text)
    })

    tasksData._deleteTask.invalidDataList.forEach(async function (test, index) {
        it(`Negative-Deleting given invalid task: ${index+1} - ${test.testName}`, async function () {

            //Creating Testdata Object
            let reqData = {
                id: test.taskId,
                token: newUser.token
            }

            //Making API request and saving response in a variable
            const res = await tasksHelper.deleteTask(this, reqData)

            //Asserting the Response
            assert.equal(res.status, tasksData.status.status404)
            assert.equal(res.statusText, tasksData.status.status404Text)
            assert.equal(res.body.message, tasksData.commonMsgs.invalidData)
        })
    })
})