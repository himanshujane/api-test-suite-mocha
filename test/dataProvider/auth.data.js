import BaseData from './base.data.js'

class TestData extends BaseData {

    //Define test data specific to testsuite

    get _registerUserText() {
        return {
            name: "name",
            email: "email",
            password: "password",
            password_confirmation: "password_confirmation",

            invalidData: "The given data was invalid.",
            invalidPasswordConfirmation: "The password confirmation does not match.",
            invalidName: "The name may only contain letters, numbers, dashes and underscores.",
            invalidEmail: "The email must be a valid email address.",
            invalidPassword: "The password must be at least 8 characters.",

            emptyName: "The name field is required.",
            emptyEmail: "The email field is required.",
            emptyPassword: "The password field is required."
        }
    }

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
                    [this._registerUserText.name]: this.fakeFirstName,
                    [this._registerUserText.email]: this.fakeEmail,
                    [this._registerUserText.password]: "testPassword",
                    [this._registerUserText.password_confirmation]: "testPassword"
                },
                reqHeader: {
                    'Content-Type': 'application/json'
                }
            },

            validDataList: [{
                    testName: "Basic valid data",
                    reqBody: {
                        [this._registerUserText.name]: this.fakeFirstName,
                        [this._registerUserText.email]: this.fakeEmail,
                        [this._registerUserText.password]: "testPassword",
                        [this._registerUserText.password_confirmation]: "testPassword"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    }
                },
                {
                    testName: "Name with underscore and dashes | password with special characters",
                    reqBody: {
                        [this._registerUserText.name]: "_" + this.fakeFirstName + "-" + this.fakeFirstName,
                        [this._registerUserText.email]: this.fakeEmail,
                        [this._registerUserText.password]: "`~!@#$%^&*()_+-={}:<>?,./;'[]|",
                        [this._registerUserText.password_confirmation]: "`~!@#$%^&*()_+-={}:<>?,./;'[]|"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    }
                },
                {
                    testName: "Input Name and password as number only",
                    reqBody: {
                        [this._registerUserText.name]: this.fakeNumber,
                        [this._registerUserText.email]: this.fakeEmail,
                        [this._registerUserText.password]: "12345678",
                        [this._registerUserText.password_confirmation]: "12345678"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    }
                }
            ],

            invalidDataList: [{
                    testName: "Space between name",
                    reqBody: {
                        [this._registerUserText.name]: this.fakeFullName,
                        [this._registerUserText.email]: this.fakeEmail,
                        [this._registerUserText.password]: "testPassword",
                        [this._registerUserText.password_confirmation]: "testPassword"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this._registerUserText.name]: [this._registerUserText.invalidName]
                    }
                },
                {
                    testName: "Password and password_confirmation different",
                    reqBody: {
                        [this._registerUserText.name]: this.fakeFirstName,
                        [this._registerUserText.email]: this.fakeEmail,
                        [this._registerUserText.password]: "testPassword",
                        [this._registerUserText.password_confirmation]: "passwordtest"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this._registerUserText.password]: [this._registerUserText.invalidPasswordConfirmation]
                    }
                },
                {
                    testName: "Invalid Email Id - No email domain",
                    reqBody: {
                        [this._registerUserText.name]: this.fakeFirstName,
                        [this._registerUserText.email]: "test",
                        [this._registerUserText.password]: "12345678",
                        [this._registerUserText.password_confirmation]: "12345678"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this._registerUserText.email]: [this._registerUserText.invalidEmail]
                    }
                },
                {
                    testName: "Space between email id",
                    reqBody: {
                        [this._registerUserText.name]: this.fakeFirstName,
                        [this._registerUserText.email]: "test @test.com",
                        [this._registerUserText.password]: "12345678",
                        [this._registerUserText.password_confirmation]: "12345678"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this._registerUserText.email]: [this._registerUserText.invalidEmail]
                    }
                },
                {
                    testName: "Password less than 8 characters",
                    reqBody: {
                        [this._registerUserText.name]: this.fakeFirstName,
                        [this._registerUserText.email]: this.fakeEmail,
                        [this._registerUserText.password]: "1234567",
                        [this._registerUserText.password_confirmation]: "1234567"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this._registerUserText.password]: [this._registerUserText.invalidPassword]
                    }
                },
                {
                    testName: "Giving all invalid inputs",
                    reqBody: {
                        [this._registerUserText.name]: this.fakeFullName,
                        [this._registerUserText.email]: "test",
                        [this._registerUserText.password]: "1234567",
                        [this._registerUserText.password_confirmation]: "123456"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this._registerUserText.name]: [this._registerUserText.invalidName],
                        [this._registerUserText.email]: [this._registerUserText.invalidEmail],
                        [this._registerUserText.password]: [this._registerUserText.invalidPassword, this._registerUserText.invalidPasswordConfirmation]
                    }
                },
                {
                    testName: "Giving all inputs as Empty",
                    reqBody: {
                        [this._registerUserText.name]: "",
                        [this._registerUserText.email]: "",
                        [this._registerUserText.password]: "",
                        [this._registerUserText.password_confirmation]: ""
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this._registerUserText.name]: [this._registerUserText.emptyName],
                        [this._registerUserText.email]: [this._registerUserText.emptyEmail],
                        [this._registerUserText.password]: [this._registerUserText.emptyPassword]
                    }
                },
                {
                    testName: "Space between password input",
                    reqBody: {
                        [this._registerUserText.name]: this.fakeFirstName,
                        [this._registerUserText.email]: this.fakeEmail,
                        [this._registerUserText.password]: "1234 567",
                        [this._registerUserText.password_confirmation]: "1234 567"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this._registerUserText.password]: [this._registerUserText.invalidPassword]
                    }
                }
            ]
        }
    }
}
export default new TestData()