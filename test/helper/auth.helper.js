import Endpoints from './endpoints.helper.js'
import HttpUtil from '../utility/http.util.js'
import authData from '../dataProvider/auth.data.js'

class AuthHelper extends HttpUtil {

    /**
     * To register a user
     * @param {object} scope To set context in report.
     * @param {object} reqData Request body and headers.
     * @returns {object} User details. [access_token|token_type|expires_in|user_id]
     */
    async registerUser(scope, reqData) {

        const reqURL = Endpoints.registerUserURL
        const response = await this.post(reqURL, reqData)

        this.setContext(scope, reqURL, reqData, response)
        return response
    }

    /**
     * To login given user
     * @param {object} scope To set context in report.
     * @param {string} email User's Email ID.
     * @param {string} password User's Password.
     * @returns {object} User details. [access_token|token_type|expires_in|user_id]
     */
    async loginUser(scope, email, password) {

        //Setting testdata for request
        const reqData = {
            reqBody: {
                "email": email,
                "password": password
            },
            reqHeader: {
                'Content-Type': 'application/json'
            }
        }

        const reqURL = Endpoints.loginUserURL
        const response = await this.post(reqURL, reqData)

        this.setContext(scope, reqURL, reqData, response)
        return response
    }

    /**
     * To get user details
     * @param {object} scope To set context in report.
     * @param {object} jsonToken Token in Json format.
     * @returns {object} User's details. [data {id|name|email}]
     */
    async getUser(scope, jsonToken) {

        const reqURL = Endpoints.getUserURL
        const response = await this.get(reqURL, jsonToken)

        this.setContext(scope, reqURL, jsonToken, response)
        return response
    }

    /**
     * To refresh auth token
     * @param {object} scope To set context in report.
     * @param {object} jsonToken Current Token in JSON format.
     * @returns {object} New Token and User details. [access_token|token_type|expires_in|user_id]
     */
    async refreshToken(scope, jsonToken) {

        //Setting testdata for request
        const reqData = {
            reqBody: {},
            reqHeader: {}
        }

        //Adding token details to request header
        Object.assign(reqData.reqHeader, jsonToken)

        const reqURL = Endpoints.refreshTokenURL
        const response = await this.post(reqURL, reqData)

        this.setContext(scope, reqURL, jsonToken, response)
        return response
    }

    /**
     * To update given user details
     * @param {object} scope To set context in report.
     * @param {Object} reqData Request body and headers.
     * @param {object} userIdAndToken User's current Id and token in JSON format.
     * @param {string} password User's current password.
     * @returns {object} User's details. [data {id|name|email}]
     */
    async updateUser(scope, reqData, userIdAndToken, password) {

        //Adding current password to request body
        Object.assign(reqData.reqBody, {
            "current_password": password
        })

        //Adding token to request header
        Object.assign(reqData.reqHeader, userIdAndToken.jsonToken)

        const reqURL = Endpoints.updateUserURL(userIdAndToken.id)
        const response = await this.put(reqURL, reqData)

        this.setContext(scope, reqURL, reqData, response)
        return response
    }

    /**
     * To delete given user
     * @param {object} scope To set context in report.
     * @param {object} jsonToken Current Token in JSON format.
     * @param {number} userId User's ID
     * @returns {object} Response from request
     */
    async deleteUser(scope, jsonToken, userId) {

        const reqURL = Endpoints.deleteUserURL(userId)
        const response = await this.delete(reqURL, jsonToken, "text")

        this.setContext(scope, reqURL, jsonToken, response)
        return response
    }

    //Helper function for data setup

    /**
     * To create a new user
     * @param {object} scope Optional -To set context in report.
     * @returns {object} New user details in JSON format [id|name|email|password|jsonToken|token]
     */
    async getNewUser(scope = null) {

        const reqURL = Endpoints.registerUserURL
        const reqData = authData._registerUser.validData

        //Registering a new user
        const response = await this.post(reqURL, reqData)

        if (scope != null) {
            this.setContext(scope, reqURL, reqData, response)
        }
        return {
            id: response.body.user_id,
            name: reqData.reqBody.name,
            email: reqData.reqBody.email,
            password: reqData.reqBody.password,
            jsonToken: await this.getJsonToken(response.body.access_token),
            token: response.body.access_token
        }
    }
}
export default new AuthHelper()