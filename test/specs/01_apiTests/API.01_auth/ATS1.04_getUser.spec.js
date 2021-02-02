import chai, {
    assert
} from 'chai'
import authData from '../../../dataProvider/auth.data.js'
import authHelper from '../../../helper/auth.helper.js'
import endpoints from '../../../helper/endpoints.helper.js'
chai.use(require('chai-json-schema'))


describe('@API Test User Authentication - Endpoint: ' + endpoints.getUserURL, function () {

    var _newUser = Object

    before('Setting Prerequisite data', async function () {
        //Registering a new user
        _newUser = await authHelper.getNewUser(this)
    })


    it(`Positive- Get user details using valid token`, async function () {

        //Making request to get user details
        const res = await authHelper.getUser(this, _newUser.jsonToken)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[200])
        assert.jsonSchema(res.body, authData._getUser.getUserSchema)
        assert.equal(res.body.data.id, _newUser.id)
        assert.equal(res.body.data.name, _newUser.name)
        assert.equal(res.body.data.email, _newUser.email)
        assert.equal((Object.keys(res.body).length), 1)
    })

    authData._getUser.invalidDataList.forEach(async function (reqToken, index) {
        it(`Negative -Get user details using: ${index+1} - ${reqToken.testName}`, async function () {

            //Making request to get user details
            const res = await authHelper.getUser(this, reqToken.token)

            //Asserting the Response
            assert.deepEqual(res.status, authData.status[401])
            assert.equal(res.body.message, authData.commonValues.unauthorized)
            assert.equal((Object.keys(res.body).length), 1)
        })
    })
})