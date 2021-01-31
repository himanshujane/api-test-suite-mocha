import faker from 'faker'

export default class ErrorData {

    /**
     * This function returns status code and status text.
     */
    get status() {
        return {

            status200: 200,
            status200Text: "OK",

            status201: 201,
            status201Text: "Created",

            status204: 204,
            status204Text: "No Content",

            status401: 401,
            status401Text: "Unauthorized",

            status404: 404,
            status404Text: "Not Found",

            status422: 422,
            status422Text: "Unprocessable Entity",
        }

    }

    /**
     * This function returns common messages 
     */
    get commonMsgs() {
        return {
            invalidData: "The given data was invalid.",
            unauthorized: "Unauthenticated."
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