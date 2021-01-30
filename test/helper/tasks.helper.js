import Endpoints from './endpoints.helper.js'
import HttpUtil from '../utility/http.util.js'
import tasksData from '../dataProvider/tasks.data.js'

class TasksHelper extends HttpUtil {

    /**
     * This function gets the create tasks endpoint and creates a new task.
     * @param {object} scope - this is object of calling testcase which is used to set context in report.
     * @param {object} reqData - this contains all the test data to pass in request
     * @returns {object} - this returns the entire response in required format
     */
    async createTasks(scope, reqData, token) {
        let reqURL = Endpoints.createTasksURL
        let response = await this.post(reqURL, reqData, token)

        this.setContext(scope, reqData, response)
        return response
    }

    /**
     * This function gets all the tasks for given user
     * @param {object} scope -this is object of calling testcase which is used to set context in report.
     * @param {string} token - it is user token for authentication
     * @returns {object} - repsponse of the request
     */
    async getAllTasks(scope, token) {
        let reqURL = Endpoints.getAllTasksURL
        let response = await this.get(reqURL, token)

        this.setContext(scope, token, response)
        return response
    }

    async deleteTask(scope, reqData) {
        let reqURL = Endpoints.deleteTaskURL(reqData.id)
        let response = await this.delete(reqURL, reqData.token)

        this.setContext(scope, reqData, response)
        return response
    }

    /**
     * This function helps to create a new task for given user
     * @returns {object} - Task datails
     */
    async setNewTask(token) {
        let reqURL = Endpoints.createTasksURL
        let reqData = tasksData._createTasks.validData
        let response = await this.post(reqURL, reqData,token)

        return response.body.data
    }
}
export default new TasksHelper()