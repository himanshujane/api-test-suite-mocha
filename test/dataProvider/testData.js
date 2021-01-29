import faker from 'faker'

class Testdata {

    //Define test data specific to testsuite

    get _registerUser() {
        return {
            registerUserSchema: {
                "properties": {
                    id: {
                        "type": 'number'
                    },
                    name: {
                        "type": 'string'
                    },
                    email: {
                        "type": 'string'
                    }
                }
            },
            validData: {
                reqBody: {
                    "name": this.fakeFirstName,
                    "email": this.fakeEmail,
                    "password": "password",
                    "password_confirmation": "password"
                },
                reqHeader: {
                    'Content-Type': 'application/json'
                }
            }
        }
    }

    //Define test data helper functions

    get fakeFirstName() {
        return faker.name.firstName()
    }
    get fakeEmail() {
        return faker.internet.email()
    }
}
export default new Testdata()