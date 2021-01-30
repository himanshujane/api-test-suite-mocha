import faker from 'faker'

export default class ErrorData {

    /**
     * This function returns status code and status text.
     */
    get status() {
        return {
            status201: 201,
            status201Text: "Created",

            status422: 422,
            status422Text: "Unprocessable Entity"
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

    get fakeNumber() {
        return faker.random.number()
    }

    get fakeText() {
        return faker.lorem.words(5)
    }
}