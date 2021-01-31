import Endpoints from './endpoints.helper.js'
import HttpUtil from '../utility/http.util.js'
import authData from '../dataProvider/auth.data.js'

class AuthHelper extends HttpUtil {

    /**
     * This function gets the register user endpoint and register a user.
     * @param {object} scope - this is object of calling testcase which is used to set context in report.
     * @param {object} reqData - this contains all the test data to pass in request
     * @returns {object} - this returns the entire response in required format
     */
    async registerUser(scope, reqData) {
        const reqURL = Endpoints.registerUserURL
        const response = await this.post(reqURL, reqData)

        this.setContext(scope, reqData, response)
        return response
    }

    /**
     * This function helps to create a new valid user
     * @returns {object} - New user datails
     */
    async getNewUser() {
        const reqURL = Endpoints.registerUserURL
        const reqData = authData._registerUser.validData

        //Registering a new user
        const response = await this.post(reqURL, reqData)

        return {
            id: response.body.user_id,
            name: reqData.reqBody.name,
            email: reqData.reqBody.email,
            token: JSON.parse(`{"Authorization" : "Bearer ${response.body.access_token}"}`)
        }
    }
}
export default new AuthHelper()