import BaseData from './base.data.js'

class AuthData extends BaseData {

    //This class defines test data specific to Auth related endpoints

    /**
     * This function defines the list of testdata to be used for register user endpoint.
     */
    get _registerUser() {
        return {
            registerUserSchema: {
                "type": "object",
                "properties": {
                    "access_token": {
                        "type": "string"
                    },
                    "token_type": {
                        "type": "string"
                    },
                    "expires_in": {
                        "type": "integer"
                    },
                    "user_id": {
                        "type": "integer"
                    }
                },
                "required": [
                    "access_token",
                    "token_type",
                    "expires_in",
                    "user_id"
                ]
            },
            validData: {
                reqBody: {
                    [this.commonKeys.name]: this.fakeFirstName,
                    [this.commonKeys.email]: this.fakeEmail,
                    [this.commonKeys.password]: "testPassword",
                    [this.commonKeys.password_confirmation]: "testPassword"
                },
                reqHeader: {
                    'Content-Type': 'application/json'
                }
            },

            updateUserData: {
                reqBody: {
                    [this.commonKeys.name]: this.fakeFirstName,
                    [this.commonKeys.email]: this.fakeEmail,
                    [this.commonKeys.password]: "newPassword",
                    [this.commonKeys.password_confirmation]: "newPassword"
                },
                reqHeader: {
                    'Content-Type': 'application/json'
                }
            },
            validDataList: [{
                    testName: "Standard inputs",
                    reqBody: {
                        [this.commonKeys.name]: this.fakeFirstName,
                        [this.commonKeys.email]: this.fakeEmail,
                        [this.commonKeys.password]: "testPassword",
                        [this.commonKeys.password_confirmation]: "testPassword"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    }
                },
                {
                    testName: "Name with underscore and dashes | password with special characters",
                    reqBody: {
                        [this.commonKeys.name]: "_" + this.fakeFirstName + "-" + this.fakeFirstName,
                        [this.commonKeys.email]: this.fakeEmail,
                        [this.commonKeys.password]: "`~!@#$%^&*()_+-={}:<>?,./;'[]|",
                        [this.commonKeys.password_confirmation]: "`~!@#$%^&*()_+-={}:<>?,./;'[]|"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    }
                },
                {
                    testName: "Input Name and password as number only",
                    reqBody: {
                        [this.commonKeys.name]: this.fakeNumber(6),
                        [this.commonKeys.email]: this.fakeEmail,
                        [this.commonKeys.password]: "12345678",
                        [this.commonKeys.password_confirmation]: "12345678"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    }
                },
                {
                    testName: "Password - Space between password input",
                    reqBody: {
                        [this.commonKeys.name]: this.fakeFirstName,
                        [this.commonKeys.email]: this.fakeEmail,
                        [this.commonKeys.password]: "1234 678",
                        [this.commonKeys.password_confirmation]: "1234 678"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    }
                },
            ],

            invalidDataList: [{
                    testName: "Name - Space between name",
                    reqBody: {
                        [this.commonKeys.name]: this.fakeFullName,
                        [this.commonKeys.email]: this.fakeEmail,
                        [this.commonKeys.password]: "testPassword",
                        [this.commonKeys.password_confirmation]: "testPassword"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this.commonKeys.name]: [this.commonValues.invalidName]
                    }
                },
                {
                    testName: "Name - Unsupported special characters",
                    reqBody: {
                        [this.commonKeys.name]: "@#$%",
                        [this.commonKeys.email]: this.fakeEmail,
                        [this.commonKeys.password]: "testPassword",
                        [this.commonKeys.password_confirmation]: "testPassword"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this.commonKeys.name]: [this.commonValues.invalidName]
                    }
                },
                {
                    testName: "Email Id - No email domain",
                    reqBody: {
                        [this.commonKeys.name]: this.fakeFirstName,
                        [this.commonKeys.email]: "test",
                        [this.commonKeys.password]: "12345678",
                        [this.commonKeys.password_confirmation]: "12345678"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this.commonKeys.email]: [this.commonValues.invalidEmail]
                    }
                },
                {
                    testName: "Email Id - Space between email id",
                    reqBody: {
                        [this.commonKeys.name]: this.fakeFirstName,
                        [this.commonKeys.email]: "test @test.com",
                        [this.commonKeys.password]: "12345678",
                        [this.commonKeys.password_confirmation]: "12345678"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this.commonKeys.email]: [this.commonValues.invalidEmail]
                    }
                },
                {
                    testName: "Password - Password less than 8 characters",
                    reqBody: {
                        [this.commonKeys.name]: this.fakeFirstName,
                        [this.commonKeys.email]: this.fakeEmail,
                        [this.commonKeys.password]: "1234567",
                        [this.commonKeys.password_confirmation]: "1234567"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this.commonKeys.password]: [this.commonValues.invalidPassword]
                    }
                },
                {
                    testName: "Password - Password and password_confirmation input different",
                    reqBody: {
                        [this.commonKeys.name]: this.fakeFirstName,
                        [this.commonKeys.email]: this.fakeEmail,
                        [this.commonKeys.password]: "testPassword",
                        [this.commonKeys.password_confirmation]: "passwordtest"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this.commonKeys.password]: [this.commonValues.invalidPasswordConfirmation]
                    }
                },
                {
                    testName: "Password - Blank password confirmation field",
                    reqBody: {
                        [this.commonKeys.name]: this.fakeFirstName,
                        [this.commonKeys.email]: this.fakeEmail,
                        [this.commonKeys.password]: "testPassword",
                        [this.commonKeys.password_confirmation]: ""
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this.commonKeys.password]: [this.commonValues.invalidPasswordConfirmation]
                    }
                },
                {
                    testName: "All inputs",
                    reqBody: {
                        [this.commonKeys.name]: this.fakeFullName,
                        [this.commonKeys.email]: "test",
                        [this.commonKeys.password]: "1234567",
                        [this.commonKeys.password_confirmation]: "123456"
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this.commonKeys.name]: [this.commonValues.invalidName],
                        [this.commonKeys.email]: [this.commonValues.invalidEmail],
                        [this.commonKeys.password]: [this.commonValues.invalidPassword, this.commonValues.invalidPasswordConfirmation]
                    }
                },
                {
                    testName: "All inputs - As Empty",
                    reqBody: {
                        [this.commonKeys.name]: "",
                        [this.commonKeys.email]: "",
                        [this.commonKeys.password]: "",
                        [this.commonKeys.password_confirmation]: ""
                    },
                    reqHeader: {
                        'Content-Type': 'application/json'
                    },
                    expectedErr: {
                        [this.commonKeys.name]: [this.commonValues.emptyName],
                        [this.commonKeys.email]: [this.commonValues.emptyEmail],
                        [this.commonKeys.password]: [this.commonValues.emptyPassword]
                    }
                }
            ]
        }
    }

    get _loginUser() {
        return {
            invalidPasswordList: [{
                    testName: "Incorrect Password",
                    [this.commonKeys.password]: "wrongPassword",
                    status: this.status[401],
                    expectedErr: {
                        [this.commonKeys.message]: undefined,
                        [this.commonKeys.email]: this.commonValues.credentialNotMatch
                    }
                },
                {
                    testName: "Blank Password",
                    [this.commonKeys.password]: "",
                    status: this.status[422],
                    expectedErr: {
                        [this.commonKeys.message]: this.commonValues.invalidData,
                        [this.commonKeys.password]: this.commonValues.emptyPassword
                    }

                }
            ],

            invalidEmailPasswordList: [{
                    testName: "Empty Email and Password",
                    userCredential: {
                        [this.commonKeys.email]: "",
                        [this.commonKeys.password]: ""
                    },
                    status: this.status[422],

                    expectedErr: {
                        [this.commonKeys.message]: this.commonValues.invalidData,
                        [this.commonKeys.email]: this.commonValues.emptyEmail,
                        [this.commonKeys.password]: this.commonValues.emptyPassword
                    }
                },
                {
                    testName: "Incorrect Email and Password",
                    userCredential: {
                        [this.commonKeys.email]: "wrongEmail@test.com",
                        [this.commonKeys.password]: "wrongPassword"
                    },
                    status: this.status[418],
                    expectedErr: {
                        [this.commonKeys.message]: undefined,
                        [this.commonKeys.email]: this.commonValues.notInSystem,
                        [this.commonKeys.password]: undefined
                    }

                }
            ]
        }
    }
}
export default new AuthData()