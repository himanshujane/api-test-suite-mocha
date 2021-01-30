export default class BaseUtil {
    /**
     * This adds context to testcase in HTML report
     * @param {*} testScope - For given test
     * @param {object} data - Data used
     * @param {object} response - Response from request
     */
    setContext(testScope, data, response) {

        addContext(testScope, `Data used: ${JSON.stringify(data)}`)
        addContext(testScope, `Response: ${JSON.stringify(response)}`)
        addContext(testScope, `Response Headers: ${JSON.stringify(response.headers.raw())}`)
    }
}