import config from '../../.mocharc.js'

export default class Endpoints {

    /**
     * This class lists all the application endpoints
     */

    static get baseURL() {
        return config.HOSTNAME + config.PORT
    }

    static get registerUserURL() {
        return this.baseURL + "/api/v1/auth/register"
    }

    static get createTasksURL() {
        return this.baseURL + "/api/v1/tasks"
    }

    static get getAllTasksURL() {
        return this.baseURL + "/api/v1/tasks"
    }

    static getTaskURL(id) {
        return this.baseURL + `/api/v1/tasks/${id}`
    }

    static updateTaskURL(id) {
        return this.baseURL + `/api/v1/tasks/${id}`
    }

    static deleteTaskURL(id) {
        return this.baseURL + `/api/v1/tasks/${id}`
    }

}