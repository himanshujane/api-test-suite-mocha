import BaseUtil from '../utility/base.util.js'

export default class HttpUtil extends BaseUtil {

    /**
     * This function makes POST request
     * @param {string} reqURL - URL to pass in request
     * @param {object} data  - this contains all the test data to pass in request
     * @returns {object} - this returns the entire response in required format
     */

    post(reqURL, data, token="") {

        if (token != "") {
            data.reqHeader ['Authorization']=`Bearer ${token}`
        }
        const requestOptions = {
            method: 'POST',
            headers: data.reqHeader,
            body: JSON.stringify(data.reqBody),
            timeout: 20000
        }
        console.log("Making POST Request to : ", reqURL)
        return fetch(reqURL, requestOptions).then(this.handleResponse);
    }

    /**
     * 
     * @param {string} reqURL - URL to pass in request
     * @param {string} token - token for authentication
     * @returns {object} - this returns the entire response in required format
     */
    get(reqURL, token="") {

        if (token != "") {
            var reqHeader = {'Authorization':`Bearer ${token}` }
        }

        const requestOptions = {
            method: 'GET',
            headers: reqHeader,
            timeout: 20000
        }
        console.log("Making GET Request to : ", reqURL)
        return fetch(reqURL, requestOptions).then(this.handleResponse);
    }

    //HTTP Helper function

    /**
     * This function handles all the responses from Http request
     * @param {object} response - raw response received from Http request
     * @returns {object} - this returns the entire response in required format
     */
    handleResponse(response) {

        return response.json().then(json => {
            return {
                status: response.status,
                statusText: response.statusText,
                body: json,
                headers: response.headers
            }
        })
    }
}