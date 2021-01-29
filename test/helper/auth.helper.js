import Endpoints from './endpoints.helper.js'
import HttpUtil from '../utility/http.util.js'


class AuthHelper extends HttpUtil {

    /**
     * This function gets the register user endpoint and register a user.
     * @param {} data - this contains all the test data to pass in request
     * @returns {object} - this returns the entire response in required format
     */
    async registerUser(data) {
        let reqURL = Endpoints.registerUserURL
        return await this.post(reqURL, data)
    }
}
export default new AuthHelper()