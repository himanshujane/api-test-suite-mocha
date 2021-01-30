import chai, {
    assert
} from 'chai'
import authData from '../../../dataProvider/auth.data.js'
import authHelper from '../../../helper/auth.helper.js'
import endpoints from '../../../helper/endpoints.helper.js'
chai.use(require('chai-json-schema'))


describe('Test User Registration - Endpoint: ' + endpoints.registerUserURL, function () {

    //Using data iterator to run same script for multiple inputs
    authData._registerUser.validDataList.forEach(async function (reqData, index) {
        it(`Positive-Register a user given: ${index+1} - Valid data ${reqData.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await authHelper.registerUser(this, reqData)

            //Asserting the Response
            assert.jsonSchema(res.body, authData._registerUser.registerUserSchema)
            assert.equal(res.status, authData.status.status201)
            assert.equal(res.statusText, authData.status.status201Text)
            assert.equal(res.body.token_type, 'bearer')
            assert.isNotEmpty(res.body.access_token)
            assert.equal(res.body.expires_in, 3600)
            assert.isAbove(res.body.user_id, 0)
            assert.equal(res.headers.get('content-type'), "application/json")
        })
    })

    authData._registerUser.invalidDataList.forEach(async function (reqData, index) {
        it(`Negative-Register a user given: ${index+1} - Invalid ${reqData.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await authHelper.registerUser(this, reqData)

            //Asserting the Response
            assert.equal(res.status, authData.status.status422)
            assert.equal(res.statusText, authData.status.status422Text)
            assert.equal(res.body.message, authData._registerUserText.invalidData)
            assert.deepEqual(res.body.errors, reqData.expectedErr)
        })
    })

    it("Negative-Register a user given: User already exists", async function () {

        //Prerequisite registering a user
        var reqData = authData._registerUser.validData
        var res = await authHelper.registerUser(this, reqData)
        assert.equal(res.status, authData.status.status201)

        //Register user given user already exists
        var res = await authHelper.registerUser(this, reqData)

        //Asserting the Response
        assert.equal(res.status, authData.status.status422)
        assert.equal(res.statusText, authData.status.status422Text)
    })
})