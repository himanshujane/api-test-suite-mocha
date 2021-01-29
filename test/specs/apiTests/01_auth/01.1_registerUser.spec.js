import chai, {
    assert
} from 'chai'
import dp from '../../../dataProvider/auth.data.js'
import helper from '../../../helper/auth.helper.js'
import endpoints from '../../../helper/endpoints.helper.js'
import utils from '../../../utility/base.util.js'
chai.use(require('chai-json-schema'))

//dp stand for data provider

describe('Test User Registration - Endpoint: ' + endpoints.registerUserURL, function () {

    //Using data iterator to run same script for multiple inputs
    dp._registerUser.validDataList.forEach(async function (reqData, index) {
        it(`Positive-Register a user given Valid data- ${index+1}- ${reqData.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await helper.registerUser(reqData)

            //Adding context to report
            utils.setContext(this, reqData, res)

            //Asserting the Response
            assert.jsonSchema(await res.body, dp._registerUser.registerUserSchema)
            assert.equal(await res.status, dp.status.status201)
            assert.equal(await res.statusText, dp.status.status201Text)
            assert.equal(await res.body.token_type, 'bearer')
            assert.isNotEmpty(await res.body.access_token)
            assert.equal(await res.body.expires_in, 3600)
            assert.isAbove(await res.body.user_id, 0)
            assert.equal(await res.headers.get('content-type'), "application/json")
        })
    })

    //Using data iterator to run same script for multiple inputs
    dp._registerUser.invalidDataList.forEach(async function (reqData, index) {
        it(`Negative-Register a user given Invalid data- ${index+1}- ${reqData.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await helper.registerUser(reqData)

            //Adding context to report
            utils.setContext(this, reqData, res)

            //Asserting the Response
            assert.equal(await res.status, dp.status.status422)
            assert.equal(await res.statusText, dp.status.status422Text)
            assert.equal(await res.body.message, dp._registerUserText.invalidData)
            assert.deepEqual(res.body.errors, reqData.expectedErr)
        })
    })

    it("Negative-Register a user given user already exists", async function () {

        //Prerequisite registering a user
        var reqData = dp._registerUser.validData
        var res = await helper.registerUser(reqData)
        assert.equal(await res.status, dp.status.status201)

        //Register user given user already exists
        var res = await helper.registerUser(reqData)

        //Adding context to report
        utils.setContext(this, reqData, res)

        //Asserting the Response
        assert.equal(await res.status, dp.status.status422)
        assert.equal(await res.statusText, dp.status.status422Text)
    })
})