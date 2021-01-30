import chai, {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import tasksHelper from '../../../helper/tasks.helper.js'
import tasksData from '../../../dataProvider/tasks.data.js'
import endpoints from '../../../helper/endpoints.helper.js'
chai.use(require('chai-json-schema'))

//dp stand for data provider

describe('Test Creation of Tasks - Endpoint: ' + endpoints.createTasksURL, function () {
    let newUser

    before('Setting Prerequisite data', async function () {
        newUser = await authHelper.getNewUser()
    })

    //Using data iterator to run same script for multiple inputs
    tasksData._createTasks.validDataList.forEach(async function (reqData, index) {
        it(`Positive-Creating Multiple tasks given same user. Task: ${index+1} - ${reqData.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await tasksHelper.createTasks(this, reqData, newUser.token)

            //Asserting the Response
            assert.jsonSchema(res.body, tasksData._createTasks.createTasksSchema)
            assert.equal(res.status, tasksData.status.status201)
            assert.equal(res.statusText, tasksData.status.status201Text)
            assert.equal(res.body.data.author.id, newUser.id)
            assert.equal(res.body.data.author.name, newUser.name)
            assert.equal(res.body.data.author.email, newUser.email)
            assert.isAbove(res.body.data.id, 0)
            assert.equal(res.body.data.title, reqData.reqBody.title)
            assert.equal(res.body.data.due_at, null)
            assert.equal(res.body.data.is_completed, false)
            assert.equal(res.headers.get('content-type'), "application/json")
        })
    })

    tasksData._createTasks.invalidDataList.forEach(async function (reqData, index) {
        it(`Negative-Creating tasks given invalid title: ${index+1} - ${reqData.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await tasksHelper.createTasks(this, reqData, newUser.token)

            //Asserting the Response
            assert.equal(res.status, tasksData.status.status422)
            assert.equal(res.statusText, tasksData.status.status422Text)
            assert.equal(res.body.message, tasksData._createTasksText.invalidData)
            assert.deepEqual(res.body.errors, reqData.expectedErr)
        })
    })

    it(`Negative-Creating tasks given Expired Token`, async function () {

        //Data Setup
        var reqData = tasksData._createTasks.validData

        //Making API request with expired token and saving response in a variable
        const res = await tasksHelper.createTasks(this, reqData, tasksData.expiredToken)

        //Asserting the Response
        assert.equal(res.status, tasksData.status.status401)
        assert.equal(res.statusText, tasksData.status.status401Text)
        assert.equal(res.body.message, tasksData._createTasksText.unauthorized)
    })
})