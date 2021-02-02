import {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import tasksHelper from '../../../helper/tasks.helper.js'
import tasksData from '../../../dataProvider/tasks.data.js'
import snippet from '../IN.00_snippets/SN.01_commonSnippets.js'


describe(`@INTEGRATION -Given User A creates a task and User B operates on User A's task`, function () {
    var _newUser1 = Object
    var _newUser2 = Object
    var _user1Task = Object

    before('Setting Prerequisite data', async function () {
        //Registering new users
        _newUser1 = await authHelper.getNewUser()
        _newUser2 = await authHelper.getNewUser()
    })

    it(`Add a task for User A`, async function () {

        //Adding a new task for user1
        _user1Task = await tasksHelper.setNewTask(_newUser1.jsonToken, this)

        //Asserting the Response for newTask1
        assert.isAbove(_user1Task.id, 0)
        assert.equal(_user1Task.author.id, _newUser1.id)
        assert.equal(_user1Task.author.email, _newUser1.email)
    })

    it(`User B fetching User A's Task should be unsuccessful`, async function () {

        //Getting task1 details using user2 token
        const res = await tasksHelper.getTask(this, _newUser2.jsonToken, _user1Task.id)

        //Asserting the Response
        snippet.assert403(res)
    })

    it(`User B updating User A's Task should be unsuccessful`, async function () {

        //Getting test data
        const reqData = tasksData._updateTask.validData

        //Making request to update the task1
        const res = await tasksHelper.updateTask(this, reqData, _newUser2.jsonToken, _user1Task.id)

        //Asserting the Response
        snippet.assert403(res)
    })

    it(`User B deleting User A's Task should be unsuccessful`, async function () {

        //Deleting Task
        var res = await tasksHelper.deleteTask(this, _newUser2.jsonToken, _user1Task.id)

        //Asserting the Response
        snippet.assert403(res)
    })
})