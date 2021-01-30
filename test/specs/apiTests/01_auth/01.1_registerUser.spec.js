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
            assert.jsonSchema(await res.body, authData._registerUser.registerUserSchema)
            assert.equal(await res.status, authData.status.status201)
            assert.equal(await res.statusText, authData.status.status201Text)
            assert.equal(await res.body.token_type, 'bearer')
            assert.isNotEmpty(await res.body.access_token)
            assert.equal(await res.body.expires_in, 3600)
            assert.isAbove(await res.body.user_id, 0)
            assert.equal(await res.headers.get('content-type'), "application/json")
        })
    })

    //Using data iterator to run same script for multiple inputs
    authData._registerUser.invalidDataList.forEach(async function (reqData, index) {
        it(`Negative-Register a user given: ${index+1} - Invalid ${reqData.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await authHelper.registerUser(this, reqData)

            //Asserting the Response
            assert.equal(await res.status, authData.status.status422)
            assert.equal(await res.statusText, authData.status.status422Text)
            assert.equal(await res.body.message, authData._registerUserText.invalidData)
            assert.deepEqual(res.body.errors, reqData.expectedErr)
        })
    })

    it("Negative-Register a user given: User already exists", async function () {

        //Prerequisite registering a user
        var reqData = authData._registerUser.validData
        var res = await authHelper.registerUser(this, reqData)
        assert.equal(await res.status, authData.status.status201)

        //Register user given user already exists
        var res = await authHelper.registerUser(this, reqData)

        //Asserting the Response
        assert.equal(await res.status, authData.status.status422)
        assert.equal(await res.statusText, authData.status.status422Text)
    })
})