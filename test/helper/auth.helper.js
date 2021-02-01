import Endpoints from './endpoints.helper.js'
import HttpUtil from '../utility/http.util.js'
import authData from '../dataProvider/auth.data.js'

class AuthHelper extends HttpUtil {

    /**
     * This function gets the register user endpoint and register a user.
     * @param {object} scope - this is object of calling testcase which is used to set context in report.
     * @param {object} reqData - this contains all the test data to pass in request
     * @returns {object} - contains user login details
     */
    async registerUser(scope, reqData) {

        const reqURL = Endpoints.registerUserURL
        const response = await this.post(reqURL, reqData)

        this.setContext(scope, reqURL, reqData, response)
        return response
    }

    /**
     * This functions helps to login user and return back login details
     * @param {object} scope  - this is object of calling testcase which is used to set context in report.
     * @param {object} userCredential - this contains user credentials 
     * @returns {object} - contains user login details
     */
    async loginUser(scope, userCredential) {

        //Setting testdata for request
        const reqData = {
            reqBody: {
                "email": userCredential.email,
                "password": userCredential.password
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
     * This functions helps to get user details
     * @param {object} scope  - this is object of calling testcase which is used to set context in report.
     * @param {object} reqHeader - this contains the request header [token]
     * @returns {object} - contains user details
     */
    async getUser(scope, reqHeader) {

        const reqURL = Endpoints.getUserURL
        const response = await this.get(reqURL, reqHeader)

        this.setContext(scope, reqURL, reqHeader, response)
        return response
    }

    /**
     * This functions refreshed the auth token
     * @param {object} scope  - this is object of calling testcase which is used to set context in report.
     * @param {object} token - this contains the old token
     * @returns {object} - contains new token and user id
     */
    async refreshToken(scope, token) {

        //Setting testdata for request
        const reqData = {
            reqBody: {},
            reqHeader: {}
        }

        //Adding token details to request header
        Object.assign(reqData.reqHeader, token)

        const reqURL = Endpoints.refreshTokenURL
        const response = await this.post(reqURL, reqData)

        this.setContext(scope, reqURL, token, response)
        return response
    }

    /**
     * This function helps to update user details
     * @param {object} scope - this is object of calling testcase which is used to set context in report.
     * @param {object} reqData - contains new user details
     * @param {object} userDetails - contains existing password, token and user id
     * @returns {object} - contains updated user details
     */
    async updateUser(scope, reqData, userDetails) {

        //Adding current password to request body
        Object.assign(reqData.reqBody, {
            "current_password": userDetails.password
        })

        //Adding token to request header
        Object.assign(reqData.reqHeader, userDetails.jsonToken)

        const reqURL = Endpoints.updateUserURL(userDetails.id)
        const response = await this.put(reqURL, reqData)

        this.setContext(scope, reqURL, reqData, response)
        return response
    }

    /**
     * This function deletes a given user
     * @param {object} scope - this is object of calling testcase which is used to set context in report.
     * @param {object} token - user token
     * @param {number} userId - user id
     * @returns {object} - contains Ok msg if user is successfully deleted 
     */
    async deleteUser(scope, token, userId) {

        const reqURL = Endpoints.deleteUserURL(userId) 
        const response = await this.delete(reqURL, token, "text")

        this.setContext(scope, reqURL, token, response)
        return response
    }


    /**
     * This function helps to create a new valid user
     * @param {object} scope - this is object of calling testcase which is used to set context in report.
     * @returns {object} - New user details
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
            token: JSON.parse(`{"Authorization" : "Bearer ${response.body.access_token}"}`),
            tokenOnly: response.body.access_token
        }
    }
}
export default new AuthHelper()