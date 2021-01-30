import BaseUtil from '../utility/base.util.js'

export default class HttpUtil extends BaseUtil {

    /**
     * This function makes HTTP POST request
     * @param {string} reqURL - URL to pass in request
     * @param {object} data  - this contains all the test data to pass in request
     * @returns {object} - this returns the entire response in required format
     */

    post(reqURL, data, token = "") {

        if (token != "") {
            data.reqHeader['Authorization'] = `Bearer ${token}`
        }
        const requestOptions = {
            method: 'POST',
            headers: data.reqHeader,
            body: JSON.stringify(data.reqBody),
            timeout: 20000
        }
        console.log("Making POST Request to : ", reqURL)
        return fetch(reqURL, requestOptions).then(this.handleResponse)
    }

    /**
     * This function makes HTTP GET request
     * @param {string} reqURL - URL to pass in request
     * @param {string} token - token for authentication
     * @returns {object} - this returns the entire response in required format
     */
    get(reqURL, token = "") {

        if (token != "") {
            var reqHeader = {
                'Authorization': `Bearer ${token}`
            }
        }

        const requestOptions = {
            method: 'GET',
            headers: reqHeader,
            timeout: 20000
        }
        console.log("Making GET Request to : ", reqURL)
        return fetch(reqURL, requestOptions).then(this.handleResponse)
    }

    /**
     * This function makes HTTP DELETE request
     * @param {string} reqURL - URL to pass in request
     * @param {string} token - token for authentication
     * @returns {object} - this returns the entire response in required format
     */
    delete(reqURL, token = "") {

        if (token != "") {
            var reqHeader = {
                'Authorization': `Bearer ${token}`
            }
        }

        const requestOptions = {
            method: 'DELETE',
            headers: reqHeader,
            timeout: 20000
        }
        console.log("Making DELETE Request to : ", reqURL)
        return fetch(reqURL, requestOptions).then(this.handleResponse)
    }

    //HTTP Helper function

    /**
     * This function handles all the responses from Http request
     * @param {object} response - raw response received from Http request
     * @returns {object} - this returns the entire response in required format
     */
    async handleResponse(response) {
        let body = await response.json().catch(err => console.log("No body in response"))
        return {
            status: response.status,
            statusText: response.statusText,
            body: body,
            headers: response.headers
        }
    }
}