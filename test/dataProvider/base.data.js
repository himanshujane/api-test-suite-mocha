import faker from 'faker'

export default class ErrorData {

    get status() {
        return {
            status201: 201,
            status201Text: "Created",

            status422: 422,
            status422Text: "Unprocessable Entity"
        }
    }

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
}