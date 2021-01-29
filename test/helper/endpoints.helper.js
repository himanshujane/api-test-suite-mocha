import config from '../../.mocharc.js'

export default class Endpoints {

    static get baseURL() {
        return config.HOSTNAME + config.PORT
    }

    static get registerUserURL() {
        return this.baseURL + "/api/v1/auth/register"
    }
}