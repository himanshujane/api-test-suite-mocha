import {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import tasksHelper from '../../../helper/tasks.helper.js'
import tasksData from '../../../dataProvider/tasks.data.js'
import snippet from '../IN.00_snippets/SN.01_commonSnippets.js'


describe('@Integration -User journery for all the task related operations', function () {
    var newUser
    var newTask1
    var newTask2
    var reqDataUpdateTask
    var taskIdAndUserToken

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
        const res = await tasksHelper.getAllTasks(this, newUser.token)

        //Asserting the Response
        assert.deepEqual(res.status, tasksData.status[200])
        assert.deepEqual(res.body.data[0], newTask1)
        assert.deepEqual(res.body.data[1], newTask2)
    })

    it(`Getting given specific task`, async function () {

        //Setting testdata
        taskIdAndUserToken = {
            id: newTask1.id,
            reqHeader: newUser.token
        }

        //Getting only first task
        const res = await tasksHelper.getTask(this, taskIdAndUserToken)

        //Asserting the Response
        assert.deepEqual(res.status, tasksData.status[200])
        assert.deepEqual(res.body.data, newTask1)
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
        const res = await tasksHelper.updateTask(this, reqDataUpdateTask)

        //Asserting the Response
        snippet.assert_ITS201_TaskDetails(res, reqDataUpdateTask)
    })

    it(`Getting given updated task`, async function () {

        //Getting updated first Task
        const res = await tasksHelper.getTask(this, taskIdAndUserToken)

        //Asserting the Response
        snippet.assert_ITS201_TaskDetails(res, reqDataUpdateTask)
    })

    it(`Deleting given Task`, async function () {

        //Making API request and saving response in a variable
        const res = await tasksHelper.deleteTask(this, taskIdAndUserToken)

        //Asserting the Response
        assert.deepEqual(res.status, tasksData.status[204])
    })

    it(`Getting the deleted task`, async function () {

        //Getting only first task
        const res = await tasksHelper.getTask(this, taskIdAndUserToken)

        //Asserting the Response
        assert.deepEqual(res.status, tasksData.status[404])
    })

})