export default class HttpUtil {
    /**
     * This adds context to testcase in HTML report
     * @param {*} testScope - For given test
     * @param {object} data - Data used
     * @param {object} response - Response from request
     */
    static setContext(testScope, data, response) {

        addContext(testScope, `Data Used: ${JSON.stringify(data)}`)
        addContext(testScope, `Response: ${JSON.stringify(response)}`)
        addContext(testScope, `Headers: ${JSON.stringify(response.headers.raw())}`)
    }
}