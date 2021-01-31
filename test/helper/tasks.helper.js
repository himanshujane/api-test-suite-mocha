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
        
        //Adding context to test report
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

        //Adding context to test report
        this.setContext(scope, reqHeader, response)

        return response
    }

    /**
     * This function deletes a given task for given user
     * @param {object} scope - this is object of calling testcase which is used to set context in report.
     * @param {object} reqData - this contains all the test data to pass in request
     * @returns {object} - contains request status
     */
    async deleteTask(scope, reqData) {
        const reqURL = Endpoints.deleteTaskURL(reqData.id)
        const response = await this.delete(reqURL, reqData.reqHeader)

        //Adding context to test report
        this.setContext(scope, reqData, response)

        return response
    }

    /**
     * This function gets a given task for given user
     * @param {object} scope - this is object of calling testcase which is used to set context in report.
     * @param {object} reqData - this contains all the test data to pass in request
     * @returns {object} - contains given task details 
     */
    async getTask(scope, reqData) {
        const reqURL = Endpoints.getTaskURL(reqData.id)
        const response = await this.get(reqURL, reqData.reqHeader)

        //Adding context to test report
        this.setContext(scope, reqData, response)
        return response
    }

    async updateTask(scope, reqData) {
        const reqURL = Endpoints.updateTaskURL(reqData.id)
        const response = await this.put(reqURL, reqData)

        //Adding context to test report
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
        const reqURL = Endpoints.createTasksURL
        var reqData = tasksData._createTasks.validData

        //Adding token to request Header
        Object.assign(reqData.reqHeader, token)

        //Creating a new task
        const response = await this.post(reqURL, reqData)

        return response.body.data
    }
}
export default new TasksHelper()