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
        it(`Positive-Creating Multiple tasks for same user. Task Number: ${index+1}`, async function () {

            //Making API request and saving response in a variable
            const res = await tasksHelper.createTasks(this, reqData, newUser.token)

            //Asserting the Response
            assert.jsonSchema(await res.body, tasksData._createTasks.createTasksSchema)
            assert.equal(await res.status, tasksData.status.status201)
            assert.equal(await res.statusText, tasksData.status.status201Text)
            assert.equal(await res.headers.get('content-type'), "application/json")
        })
    })
})