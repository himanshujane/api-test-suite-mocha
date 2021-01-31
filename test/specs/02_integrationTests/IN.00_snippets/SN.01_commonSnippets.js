import tasksData from '../../../dataProvider/tasks.data.js'
import {
    assert
} from 'chai'

/**
 * To reduce code duplication one can use this class to write functions for any repetitive code like assertions
 */
class CommonSnippets {

    assert403(res) {

        assert.deepEqual(res.status, tasksData.status[403])
        assert.equal(res.body.message, tasksData.commonMsgs.actionUnauthorized)
        assert.equal((Object.keys(res.body).length), 1)
    }

    assert_ITS201_TaskDetails(res, reqDataUpdateTask, id) {

        assert.deepEqual(res.status, tasksData.status[200])
        assert.equal(res.body.data.id, id)
        assert.equal(res.body.data.title, reqDataUpdateTask.reqBody.title)
        assert.equal(res.body.data.is_completed, reqDataUpdateTask.reqBody.is_completed)
    }
}
export default new CommonSnippets()