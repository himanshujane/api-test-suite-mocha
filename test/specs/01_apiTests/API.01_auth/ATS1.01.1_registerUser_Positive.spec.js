import chai, {
    assert
} from 'chai'
import authData from '../../../dataProvider/auth.data.js'
import authHelper from '../../../helper/auth.helper.js'
import endpoints from '../../../helper/endpoints.helper.js'
chai.use(require('chai-json-schema'))


describe('@API Test User Registration [Positive]- Endpoint: ' + endpoints.registerUserURL, function () {

    //Using data iterator to run same script for multiple inputs
    authData._registerUser.validDataList.forEach(async function (reqData, index) {
        it(`Positive-Register a user given: ${index+1} - Valid data ${reqData.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await authHelper.registerUser(this, reqData)

            //Asserting the Response
            assert.deepEqual(res.status, authData.status[201])
            assert.jsonSchema(res.body, authData._registerUser.registerUserSchema)
            assert.equal(res.body.token_type, 'bearer')
            assert.isNotEmpty(res.body.access_token)
            assert.equal(res.body.expires_in, 3600)
            assert.isAbove(res.body.user_id, 0)
            assert.equal(res.headers.get('content-type'), "application/json")
        })
    })
})