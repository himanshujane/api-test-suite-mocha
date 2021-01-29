export default class HttpUtil {

    /**
     * This function makes POST request
     * @param {string} reqURL - URL to pass in request
     * @param {object} data  - this contains all the test data to pass in request
     * @returns {object} - this returns the entire response in required format
     */

    post(reqURL, data) {

        const requestOptions = {
            method: 'POST',
            headers: data.reqHeader,
            body: JSON.stringify(data.reqBody),
            timeout: 20000
        }
        console.log("Making POST Request to : ", reqURL)
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