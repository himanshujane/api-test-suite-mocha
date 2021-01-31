import Endpoints from './endpoints.helper.js'
import HttpUtil from '../utility/http.util.js'
import tasksData from '../dataProvider/tasks.data.js'

class TasksHelper extends HttpUtil {

    /**
     * This function creats a new task for given user
     * @param {object} scope - this is object of calling testcase which is used to set context in report.
     * @param {object} reqData - this contains all the test data to pass in request
     * @returns {object} - contains details of newly created task
     */
    async createTasks(scope, reqData) {
        
        const reqURL = Endpoints.createTasksURL
        const response = await this.post(reqURL, reqData)

        this.setContext(scope, reqData, response)
        return response
    }

    /**
     * This function gets all the tasks for given user
     * @param {object} scope -this is object of calling testcase which is used to set context in report.
     * @param {string} reqHeader - contains token
     * @returns {object} - contains list of all the tasks for given user
     */
    async getAllTasks(scope, reqHeader) {
        
        const reqURL = Endpoints.getAllTasksURL
        const response = await this.get(reqURL, reqHeader)

        this.setContext(scope, reqHeader, response)
        return response
    }

    /**
     * This function deletes a given task for given user
     * @param {object} scope - this is object of calling testcase which is used to set context in report.
     * @param {object} token - user token
     * @param {number} taskId - task id
     * @returns {object} - contains request status
     */
    async deleteTask(scope, token, taskId) {
        
        const reqURL = Endpoints.deleteTaskURL(taskId)
        const response = await this.delete(reqURL, token)

        this.setContext(scope, token, response)
        return response
    }

    /**
     * This function gets a given task for given user
     * @param {object} scope - this is object of calling testcase which is used to set context in report.
     * @param {object} token - user token
     * @param {number} taskId - task id
     * @returns {object} - contains given task details 
     */
    async getTask(scope, token, taskId) {
       
        const reqURL = Endpoints.getTaskURL(taskId)
        const response = await this.get(reqURL, token)

        this.setContext(scope, token, response)
        return response
    }

    /**
     * this function updates the task
     * @param {object} scope - this is object of calling testcase which is used to set context in report.
     * @param {object} reqData - contains new task details
     * @param {object} token - user token
     * @param {number} taskId - task id
     * @returns {object} - contains udpated task details 
     */
    async updateTask(scope, reqData, token, taskId) {

        //Adding token to request Header
        Object.assign(reqData.reqHeader, token)

        const reqURL = Endpoints.updateTaskURL(taskId)
        const response = await this.put(reqURL, reqData)

        this.setContext(scope, reqData, response)
        return response
    }


    //Helper functions to setup data

    /**
     * This function helps to create a new task for given user
     * @param {string} token - Accepts a user token
     * @returns {object} - contains new task details for given user
     */
    async setNewTask(token) {
       
        var reqData = tasksData._createTasks.validData

        //Adding token to request Header
        Object.assign(reqData.reqHeader, token)

        const reqURL = Endpoints.createTasksURL
        const response = await this.post(reqURL, reqData)

        return response.body.data
    }
}
export default new TasksHelper()