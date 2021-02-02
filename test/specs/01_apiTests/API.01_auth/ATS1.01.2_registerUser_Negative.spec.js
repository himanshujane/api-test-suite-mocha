import chai, {
    assert
} from 'chai'
import authData from '../../../dataProvider/auth.data.js'
import authHelper from '../../../helper/auth.helper.js'
import endpoints from '../../../helper/endpoints.helper.js'
chai.use(require('chai-json-schema'))


describe('@API Test User Registration [Negative]- Endpoint: ' + endpoints.registerUserURL, function () {

    authData._registerUser.invalidDataList.forEach(async function (reqData, index) {
        it(`Negative-Register a user given: ${index+1} - Invalid ${reqData.testName}`, async function () {

            //Making API request and saving response in a variable
            const res = await authHelper.registerUser(this, reqData)

            //Asserting the Response
            assert.deepEqual(res.status, authData.status[422])
            assert.equal(res.body.message, authData.commonValues.invalidData)
            assert.deepEqual(res.body.errors, reqData.expectedErr)
        })
    })

    it("Negative-Register a user given: User already exists", async function () {

        //Prerequisite registering a user
        const reqData = authData._registerUser.validData
        var res = await authHelper.registerUser(this, reqData)
        assert.deepEqual(res.status, authData.status[201])

        //Register user given user already exists
        var res = await authHelper.registerUser(this, reqData)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[422])
    })
})