import {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import tasksHelper from '../../../helper/tasks.helper.js'
import tasksData from '../../../dataProvider/tasks.data.js'
import snippet from '../IN.00_snippets/SN.01_commonSnippets.js'


describe(`@Integration -Given User with its own token when operates on other user's tasks`, function () {
    var newUser1
    var newUser2
    var user1Task

    before('Setting Prerequisite data', async function () {
        //Registering a new user
        newUser1 = await authHelper.getNewUser()
        newUser2 = await authHelper.getNewUser()
    })

    it(`Adding a task to user1`, async function () {

        //Adding a new task for user1
        user1Task = await tasksHelper.setNewTask(newUser1.token)

        //Asserting the Response for newTask1
        assert.isAbove(user1Task.id, 0)
        assert.equal(user1Task.author.id, newUser1.id)
        assert.equal(user1Task.author.email, newUser1.email)
    })

    it(`Accessing user1's task using user2`, async function () {
        //Assigning Task Id of user1 and token of user2
        const reqData = {
            id: user1Task.id,
            reqHeader: newUser2.token
        }

        //Getting task1 details using user2 token
        const res = await tasksHelper.getTask(this, reqData)

        //Asserting the Response
        snippet.assert403(res)
    })

    it(`User2 updating task of user1`, async function () {

        //Getting test data
        const reqData = tasksData._updateTask.validData

        //Adding User2 token to request Header
        Object.assign(reqData.reqHeader, newUser2.token)

        //Adding user1's Task id to request data
        Object.assign(reqData, {
            id: user1Task.id
        })

        //Making request to update the task1
        const res = await tasksHelper.updateTask(this, reqData)

        //Asserting the Response
        snippet.assert403(res)
    })

    it(`User2 deleting task of user1`, async function () {

        //Assigning Task Id of user1 and token of user2
        const reqData = {
            id: user1Task.id,
            reqHeader: newUser2.token
        }

        //Deleting Task
        var res = await tasksHelper.deleteTask(this, reqData)

        //Asserting the Response
        snippet.assert403(res)
    })
})