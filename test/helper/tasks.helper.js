import Endpoints from './endpoints.helper.js'
import HttpUtil from '../utility/http.util.js'
import tasksData from '../dataProvider/tasks.data.js'

class TasksHelper extends HttpUtil {

    /**
     * To create a new task
     * @param {object} scope To set context in report.
     * @param {object} reqData Request body and headers.
     * @param {object} jsonToken Token in Json format.
     * @returns {object} Task details. [data {id|title|due_at|is_completed|author{id|name|email}}]
     */
    async createTasks(scope, reqData, jsonToken) {

        //Adding token to request Header
        Object.assign(reqData.reqHeader, jsonToken)

        const reqURL = Endpoints.createTasksURL
        const response = await this.post(reqURL, reqData)

        this.setContext(scope, reqURL, reqData, response)
        return response
    }

    /**
     * To get all the task
     * @param {object} scope To set context in report.
     * @param {object} jsonToken Token in Json format.
     * @returns {object} List of all the Tasks. [data {id|title|due_at|is_completed|author{id|name|email}}]
     */
    async getAllTasks(scope, jsonToken) {

        const reqURL = Endpoints.getAllTasksURL
        const response = await this.get(reqURL, jsonToken)

        this.setContext(scope, reqURL, jsonToken, response)
        return response
    }

    /**
     * To delete a given task
     * @param {object} scope To set context in report.
     * @param {object} jsonToken Token in Json format.
     * @param {number} taskId User's Task Id
     * @returns {object} Default response
     */
    async deleteTask(scope, jsonToken, taskId) {

        const reqURL = Endpoints.deleteTaskURL(taskId)
        const response = await this.delete(reqURL, jsonToken)

        this.setContext(scope, reqURL, jsonToken, response)
        return response
    }

    /**
     * To get a given task
     * @param {object} scope To set context in report.
     * @param {object} jsonToken Token in Json format.
     * @param {number} taskId  User's Task Id
     * @returns {object} Task details. [data {id|title|due_at|is_completed|author{id|name|email}}]
     */
    async getTask(scope, jsonToken, taskId) {

        const reqURL = Endpoints.getTaskURL(taskId)
        const response = await this.get(reqURL, jsonToken)

        this.setContext(scope, reqURL, jsonToken, response)
        return response
    }

    /**
     * To update a given task
     * @param {object} scope To set context in report.
     * @param {object} reqData Request body and headers.
     * @param {object} jsonToken Token in Json format.
     * @param {number} taskId User's Task Id
     * @returns {object} Updated Task details. [data {id|title|due_at|is_completed|author{id|name|email}}]
     */
    async updateTask(scope, reqData, jsonToken, taskId) {

        //Adding token to request Header
        Object.assign(reqData.reqHeader, jsonToken)

        const reqURL = Endpoints.updateTaskURL(taskId)
        const response = await this.put(reqURL, reqData)

        this.setContext(scope, reqURL, reqData, response)
        return response
    }


    //Helper functions for data setup

    /**
     * To create a new task
     * @param {string} jsonToken Token in Json format.
     * @param {object} scope Optional - To set context in report.
     * @returns {object} Task details. [data {id|title|due_at|is_completed|author{id|name|email}}]
     */
    async setNewTask(token, scope = null) {

        var reqData = tasksData._createTasks.validData

        //Adding token to request Header
        Object.assign(reqData.reqHeader, token)

        const reqURL = Endpoints.createTasksURL
        const response = await this.post(reqURL, reqData)

        if (scope != null) {
            this.setContext(scope, reqURL, reqData, response)
        }
        return response.body.data
    }
}
export default new TasksHelper()