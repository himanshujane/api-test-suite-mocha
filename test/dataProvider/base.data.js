import faker from 'faker'

export default class ErrorData {

    /**
     * This function returns status code and status text.
     */
    get status() {
        return {

            200: {
                status: 200,
                statusText: "OK"
            },

            201: {
                status: 201,
                statusText: "Created"
            },

            204: {
                status: 204,
                statusText: "No Content"
            },

            401: {
                status: 401,
                statusText: "Unauthorized"
            },

            403: {
                status: 403,
                statusText: "Forbidden"
            },

            404: {
                status: 404,
                statusText: "Not Found"
            },

            422: {
                status: 422,
                statusText: "Unprocessable Entity"
            }
        }

    }

    /**
     * This function returns common messages 
     */
    get commonMsgs() {
        return {
            invalidData: "The given data was invalid.",
            unauthorized: "Unauthenticated.",
            actionUnauthorized: "This action is unauthorized."
        }
    }

    /**
     * This function retruns Expired Token
     */
    get expiredToken() {
        return {
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE2MDczMjc3MDUsImV4cCI6MTYwNzMyNzc2NSwibmJmIjoxNjA3MzI3NzA1LCJqdGkiOiJyN3JiMURrS2gxZUIzb3NKIiwic3ViIjoxMDAxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.lWGP0RdkmGtjLwMtFhI3_SlKiZWWvUDY8jmakRqIM-w"
        }
    }


    /**
     * Following functions generates fake testdata
     */
    get fakeFullName() {
        return faker.name.findName()
    }

    get fakeFirstName() {
        return faker.name.firstName()
    }

    get fakeEmail() {
        return faker.internet.email()
    }

    get fakeText() {
        return faker.lorem.words(5)
    }

    /**
     * @param {number} len - Length of the requested number 
     * @returns {number} 
     */
    fakeNumber(len) {
        return faker.random.number(len)
    }

    /**
     * @param {number} len - Length of the requested string 
     * @returns {string} 
     */
    fakeAlphaNumeric(len) {
        return faker.random.alphaNumeric(len)
    }
}