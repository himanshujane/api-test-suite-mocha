import chai, {
    assert
} from 'chai'
import authData from '../../../dataProvider/auth.data.js'
import authHelper from '../../../helper/auth.helper.js'
import endpoints from '../../../helper/endpoints.helper.js'
chai.use(require('chai-json-schema'))


describe('@API Test User Login - Endpoint: ' + endpoints.loginUserURL, function () {

    var _newUser = Object

    before('Setting Prerequisite data', async function () {
        //Registering a new user
        _newUser = await authHelper.getNewUser(this)
    })


    it(`Positive- Able to login user`, async function () {

        //Making request to login user
        const res = await authHelper.loginUser(this, _newUser.email, _newUser.password)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[201])
        assert.jsonSchema(res.body, authData._registerUser.registerUserSchema)
        assert.equal(res.body.user_id, _newUser.id)
        assert.equal(res.body.token_type, 'bearer')
        assert.notEqual(res.body.access_token, _newUser.token)
        assert.equal(res.body.expires_in, 3600)
    })

    authData._loginUser.invalidPasswordList.forEach(async function (reqData, index) {
        it(`Negative -Login with invalid password: ${index+1} - ${reqData.testName}`, async function () {

            //Making request to login user
            const res = await authHelper.loginUser(this, _newUser.email, reqData.password)

            //Asserting the Response
            assert.deepEqual(res.status, reqData.status)
            assert.equal(res.body.message, reqData.expectedErr.message)
            assert.equal(res.body.errors.email, reqData.expectedErr.email)
        })
    })

    authData._loginUser.invalidEmailPasswordList.forEach(async function (reqData, index) {
        it(`Negative -Login with invalid email and password: ${index+1} - ${reqData.testName}`, async function () {

            //Making request to login user
            const res = await authHelper.loginUser(this, reqData.email, reqData.password)

            //Asserting the Response
            assert.deepEqual(res.status, reqData.status)
            assert.equal(res.body.message, reqData.expectedErr.message)
            assert.equal(res.body.errors.email, reqData.expectedErr.email)
            assert.equal(res.body.errors.password, reqData.expectedErr.password)
        })
    })
})