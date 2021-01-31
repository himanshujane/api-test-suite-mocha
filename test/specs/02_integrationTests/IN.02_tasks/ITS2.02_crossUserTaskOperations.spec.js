import {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import tasksHelper from '../../../helper/tasks.helper.js'
import tasksData from '../../../dataProvider/tasks.data.js'
import snippet from '../IN.00_snippets/SN.01_commonSnippets.js'


describe(`@Integration -Given User with its own token when operates on other user's tasks`, function () {
    var _newUser1 = Object
    var _newUser2 = Object
    var _user1Task = Object

    before('Setting Prerequisite data', async function () {
        //Registering a new user
        _newUser1 = await authHelper.getNewUser()
        _newUser2 = await authHelper.getNewUser()
    })

    it(`Adding a task to user1`, async function () {

        //Adding a new task for user1
        _user1Task = await tasksHelper.setNewTask(_newUser1.token)

        //Asserting the Response for newTask1
        assert.isAbove(_user1Task.id, 0)
        assert.equal(_user1Task.author.id, _newUser1.id)
        assert.equal(_user1Task.author.email, _newUser1.email)
    })

    it(`Accessing user1's task using user2`, async function () {

        //Getting task1 details using user2 token
        const res = await tasksHelper.getTask(this, _newUser2.token, _user1Task.id)

        //Asserting the Response
        snippet.assert403(res)
    })

    it(`User2 updating task of user1`, async function () {

        //Getting test data
        const reqData = tasksData._updateTask.validData

        //Making request to update the task1
        const res = await tasksHelper.updateTask(this, reqData, _newUser2.token, _user1Task.id)

        //Asserting the Response
        snippet.assert403(res)
    })

    it(`User2 deleting task of user1`, async function () {

        //Deleting Task
        var res = await tasksHelper.deleteTask(this, _newUser2.token, _user1Task.id)

        //Asserting the Response
        snippet.assert403(res)
    })
})