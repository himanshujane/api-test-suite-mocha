import chai, {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import tasksHelper from '../../../helper/tasks.helper.js'
import tasksData from '../../../dataProvider/tasks.data.js'
import endpoints from '../../../helper/endpoints.helper.js'
chai.use(require('chai-json-schema'))


describe('@API Test Creation of Tasks - Endpoint: ' + endpoints.createTasksURL, function () {
    var _newUser = Object

    before('Setting Prerequisite data', async function () {
        _newUser = await authHelper.getNewUser()
    })

    //Using data iterator to run same script for multiple inputs
    tasksData._createTasks.validDataList.forEach(async function (reqData, index) {
        it(`Positive-Creating Multiple tasks given same user. Task: ${index+1} - ${reqData.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await tasksHelper.createTasks(this, reqData, _newUser.jsonToken)

            //Asserting the Response
            assert.deepEqual(res.status, tasksData.status[201])
            assert.jsonSchema(res.body, tasksData._createTasks.createTasksSchema)
            assert.equal(res.body.data.author.id, _newUser.id)
            assert.equal(res.body.data.author.name, _newUser.name)
            assert.equal(res.body.data.author.email, _newUser.email)
            assert.isAbove(res.body.data.id, 0)
            assert.equal(res.body.data.title, reqData.reqBody.title)
            assert.equal(res.body.data.due_at, reqData.expectedResponse.due_at)
            assert.equal(res.body.data.is_completed, reqData.expectedResponse.is_completed)
            assert.equal(res.headers.get('content-type'), "application/json")
        })
    })

    tasksData._createTasks.invalidDataList.forEach(async function (reqData, index) {
        it(`Negative-Creating tasks given invalid title: ${index+1} - ${reqData.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await tasksHelper.createTasks(this, reqData, _newUser.jsonToken)

            //Asserting the Response
            assert.deepEqual(res.status, tasksData.status[422])
            assert.equal(res.body.message, tasksData.commonValues.invalidData)
            assert.deepEqual(res.body.errors, reqData.expectedErr)
        })
    })

    it(`Negative-Creating tasks given Expired Token`, async function () {

        //Getting Data
        const reqData = tasksData._createTasks.validData

        //Making API request with expired token and saving response in a variable
        const res = await tasksHelper.createTasks(this, reqData, tasksData.expiredToken)

        //Asserting the Response
        assert.deepEqual(res.status, tasksData.status[401])
        assert.equal(res.body.message, tasksData.commonValues.unauthorized)
    })
})