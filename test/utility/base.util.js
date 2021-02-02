export default class BaseUtil {
    /**
     * To add context to testcase in HTML report
     * @param {object} testScope Given test instance
     * @param {string} requestURL Request URL
     * @param {object} requestData Request data
     * @param {object} response - Response from request
     */
    setContext(testScope, requestURL, requestData, response) {

        addContext(testScope, `Request URL: ${requestURL}`)
        addContext(testScope, `Request Data: ${JSON.stringify(requestData)}`)
        addContext(testScope, `Response: ${JSON.stringify(response)}`)
        addContext(testScope, `Response Headers: ${JSON.stringify(response.headers.raw())}`)
    }
}