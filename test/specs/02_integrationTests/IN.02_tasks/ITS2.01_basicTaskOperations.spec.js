import {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import tasksHelper from '../../../helper/tasks.helper.js'
import tasksData from '../../../dataProvider/tasks.data.js'
import snippet from '../IN.00_snippets/SN.01_commonSnippets.js'


describe('@INTEGRATION -User journey for all the task related operations', function () {
    var _newUser = Object
    var _newTask1 = Object
    var _newTask2 = Object
    var _reqDataUpdateTask = Object

    before('Setting Prerequisite data', async function () {
        //Registering a new user
        _newUser = await authHelper.getNewUser(this)
    })

    it(`Add two new tasks`, async function () {

        //Adding two new Tasks
        _newTask1 = await tasksHelper.setNewTask(_newUser.jsonToken, this)
        _newTask2 = await tasksHelper.setNewTask(_newUser.jsonToken, this)

        //Asserting the Response for _newTask1
        assert.isAbove(_newTask1.id, 0)
        assert.equal(_newTask1.author.id, _newUser.id)
        assert.equal(_newTask1.author.email, _newUser.email)

        //Asserting the Response for _newTask2
        assert.notEqual(_newTask1.id, _newTask2.id)
        assert.isAbove(_newTask2.id, 0)
        assert.equal(_newTask2.author.id, _newUser.id)
        assert.equal(_newTask2.author.email, _newUser.email)
    })

    it(`Get all the tasks`, async function () {

        //Getting All Tasks
        const res = await tasksHelper.getAllTasks(this, _newUser.jsonToken)

        //Asserting the Response
        assert.deepEqual(res.status, tasksData.status[200])
        assert.deepEqual(res.body.data[0], _newTask1)
        assert.deepEqual(res.body.data[1], _newTask2)
    })

    it(`Get given specific task`, async function () {

        //Getting only first task
        const res = await tasksHelper.getTask(this, _newUser.jsonToken, _newTask1.id)

        //Asserting the Response
        assert.deepEqual(res.status, tasksData.status[200])
        assert.deepEqual(res.body.data, _newTask1)
    })

    it(`Update given specific task`, async function () {

        //Getting test data
        _reqDataUpdateTask = tasksData._updateTask.validData

        //Making request to update the task1
        const res = await tasksHelper.updateTask(this, _reqDataUpdateTask, _newUser.jsonToken, _newTask1.id)

        //Asserting the Response
        snippet.assert_ITS201_TaskDetails(res, _reqDataUpdateTask, _newTask1.id)
    })

    it(`Get given updated task`, async function () {

        //Getting updated first Task
        const res = await tasksHelper.getTask(this, _newUser.jsonToken, _newTask1.id)

        //Asserting the Response
        snippet.assert_ITS201_TaskDetails(res, _reqDataUpdateTask, _newTask1.id)
    })

    it(`Delete given Task`, async function () {

        //Making API request and saving response in a variable
        const res = await tasksHelper.deleteTask(this, _newUser.jsonToken, _newTask1.id)

        //Asserting the Response
        assert.deepEqual(res.status, tasksData.status[204])
    })

    it(`Given task is deleted - validate get task should be unsuccessful`, async function () {

        //Getting only first task
        const res = await tasksHelper.getTask(this, _newUser.jsonToken, _newTask1.id)

        //Asserting the Response
        assert.deepEqual(res.status, tasksData.status[404])
    })
})