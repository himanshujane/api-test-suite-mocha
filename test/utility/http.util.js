import BaseUtil from '../utility/base.util.js'

export default class HttpUtil extends BaseUtil {

    /**
     * To make HTTP POST request.
     * @param {string} reqURL URL to pass in request.
     * @param {object} reqData  Data to be passed in request.
     * @returns {object} Response of the request.
     */

    post(reqURL, reqData) {

        const requestOptions = {
            method: 'POST',
            headers: reqData.reqHeader,
            body: JSON.stringify(reqData.reqBody),
            timeout: 30000
        }
        console.log("Making POST Request to : ", reqURL)
        return fetch(reqURL, requestOptions).then(this.handleResponse)
    }

    /**
     * To make HTTP PUT request.
     * @param {string} reqURL URL to pass in request.
     * @param {object} reqData Data to be passed in request.
     * @returns {object} Response of the request.
     */
    put(reqURL, reqData) {

        const requestOptions = {
            method: 'PUT',
            headers: reqData.reqHeader,
            body: JSON.stringify(reqData.reqBody),
            timeout: 20000
        }
        console.log("Making PUT Request to : ", reqURL)
        return fetch(reqURL, requestOptions).then(this.handleResponse)
    }

    /**
     * To make HTTP GET request.
     * @param {string} reqURL URL to pass in request.
     * @param {string} reqHeader Headers to be passed in request.
     * @returns {object} Response of the request.
     */
    get(reqURL, reqHeader = "") {

        const requestOptions = {
            method: 'GET',
            headers: reqHeader,
            timeout: 30000
        }
        console.log("Making GET Request to : ", reqURL)
        return fetch(reqURL, requestOptions).then(this.handleResponse)
    }

    /**
     * To make HTTP DELETE request.
     * @param {string} reqURL URL to pass in request.
     * @param {object} reqHeader Headers to be passed in request.
     * @param {string} resType Response type [by default it is JSON]
     * @returns {object} Response of the request.
     */
    delete(reqURL, reqHeader = "", resType = "json") {

        const requestOptions = {
            method: 'DELETE',
            headers: reqHeader,
            timeout: 20000
        }
        console.log("Making DELETE Request to : ", reqURL)
        return fetch(reqURL, requestOptions).then(res => this.handleResponse(res, resType))
    }

    //HTTP Helper function

    /**
     * To handle responses from HTTP request.
     * @param {object} response Raw response from request.
     * @param {string} resType Response type [by default it is JSON]
     * @returns {object} Response of the request
     */
    async handleResponse(response, resType = "json") {

        var body
        if (resType == "json")
            body = await response.json().catch(err => console.log("*WARNING: No JSON response in body*"))
        else
            body = await response.text().catch(err => console.log("*WARNING: No response in body*"))

        return {
            status: {
                status: response.status,
                statusText: response.statusText
            },
            body: body,
            headers: response.headers
        }
    }

    /**
     * To get Token in JSON format
     * @param {string} token Token Id
     * @returns {object} Token in JSON format [To add in request header] 
     */
    async getJsonToken(token) {
        return JSON.parse(`{"Authorization" : "Bearer ${token}"}`)
    }
}