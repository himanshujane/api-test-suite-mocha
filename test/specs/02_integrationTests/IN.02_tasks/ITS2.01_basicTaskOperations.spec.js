import chai, {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import tasksHelper from '../../../helper/tasks.helper.js'
import tasksData from '../../../dataProvider/tasks.data.js'
chai.use(require('chai-json-schema'))


describe('@Integration -User journery for all the task realted operations', function () {
    var newUser
    var newTask1
    var newTask2
    var reqDataUpdateTask

    before('Setting Prerequisite data', async function () {
        //Registering a new user
        newUser = await authHelper.getNewUser()
    })

    it(`Adding Two new tasks`, async function () {

        //Adding two new Tasks
        newTask1 = await tasksHelper.setNewTask(newUser.token)
        newTask2 = await tasksHelper.setNewTask(newUser.token)

        //Asserting the Response for newTask1
        assert.isAbove(newTask1.id, 0)
        assert.equal(newTask1.author.id, newUser.id)
        assert.equal(newTask1.author.email, newUser.email)

        //Asserting the Response for newTask2
        assert.notEqual(newTask1.id, newTask2.id)
        assert.isAbove(newTask2.id, 0)
        assert.equal(newTask2.author.id, newUser.id)
        assert.equal(newTask2.author.email, newUser.email)
    })

    it(`Getting all the task`, async function () {

        //Getting All Tasks
        const allTasks = await tasksHelper.getAllTasks(this, newUser.token)

        //Asserting the Response
        assert.equal(allTasks.status, tasksData.status.status200)
        assert.equal(allTasks.statusText, tasksData.status.status200Text)
        assert.deepEqual(allTasks.body.data[0], newTask1)
        assert.deepEqual(allTasks.body.data[1], newTask2)
    })

    it(`Getting given specific task`, async function () {

        //Setting testdata
        const reqData = {
            id: newTask1.id,
            reqHeader: newUser.token
        }

        //Getting only first task
        const firstTask = await tasksHelper.getTask(this, reqData)

        //Asserting the Response
        assert.equal(firstTask.status, tasksData.status.status200)
        assert.equal(firstTask.statusText, tasksData.status.status200Text)
        assert.deepEqual(firstTask.body.data, newTask1)
    })

    it(`Updating given specific task`, async function () {

        //Getting test data
        reqDataUpdateTask = tasksData._updateTask.validData

        //Adding token to request Header
        Object.assign(reqDataUpdateTask.reqHeader, newUser.token)

        //Adding task id to request data
        Object.assign(reqDataUpdateTask, {
            id: newTask1.id
        })

        //Making request to update the task1
        const updatedFirstTask = await tasksHelper.updateTask(this, reqDataUpdateTask)

        //Asserting the Response
        assert.equal(updatedFirstTask.status, tasksData.status.status200)
        assert.equal(updatedFirstTask.statusText, tasksData.status.status200Text)
        assert.equal(updatedFirstTask.body.data.id, reqDataUpdateTask.id)
        assert.equal(updatedFirstTask.body.data.title, reqDataUpdateTask.reqBody.title)
        assert.equal(updatedFirstTask.body.data.is_completed, reqDataUpdateTask.reqBody.is_completed)
    })

    it(`Getting given updated task`, async function () {

        //Setting testdata
        const reqData = {
            id: newTask1.id,
            reqHeader: newUser.token
        }

        //Getting updated first Task
        const updatedFirstTask = await tasksHelper.getTask(this, reqData)

        //Asserting the Response
        assert.equal(updatedFirstTask.status, tasksData.status.status200)
        assert.equal(updatedFirstTask.statusText, tasksData.status.status200Text)
        assert.equal(updatedFirstTask.body.data.id, reqDataUpdateTask.id)
        assert.equal(updatedFirstTask.body.data.title, reqDataUpdateTask.reqBody.title)
        assert.equal(updatedFirstTask.body.data.is_completed, reqDataUpdateTask.reqBody.is_completed)
    })
})