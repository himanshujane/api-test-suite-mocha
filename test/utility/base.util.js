export default class BaseUtil {
    /**
     * This adds context to testcase in HTML report
     * @param {object} testScope - Given test instance
     * @param {string} - Requesting URL
     * @param {object} data - Data used
     * @param {object} response - Response from request
     */
    setContext(testScope, reqURL, data, response) {

        addContext(testScope, `Request URL: ${reqURL}`)
        addContext(testScope, `Request Data: ${JSON.stringify(data)}`)
        addContext(testScope, `Response: ${JSON.stringify(response)}`)
        addContext(testScope, `Response Headers: ${JSON.stringify(response.headers.raw())}`)
    }
}