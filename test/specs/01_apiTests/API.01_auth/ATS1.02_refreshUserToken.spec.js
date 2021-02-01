import chai, {
    assert
} from 'chai'
import authData from '../../../dataProvider/auth.data.js'
import authHelper from '../../../helper/auth.helper.js'
import endpoints from '../../../helper/endpoints.helper.js'
chai.use(require('chai-json-schema'))


describe('@API Test User Token Refresh - Endpoint: ' + endpoints.refreshTokenURL, function () {

    var _i = 1
    var _newUser = Object
    var _newUser2 = Object
    var _userTokenJson = JSON
    var _userToken = String

    before('Setting Prerequisite data', async function () {
        //Registering a new user
        _newUser = await authHelper.getNewUser(this)
        _userTokenJson = _newUser.token
        _userToken = _newUser.tokenOnly
        _newUser2 = await authHelper.getNewUser(this)
    })

    //Running same script for 3 times
    while (_i <= 3) {
        it(`Positive-Able to refresh Token : ${_i} time`, async function () {

            //Making request to refresh the token
            const res = await authHelper.refreshToken(this, _userTokenJson)

            //Asserting the Response
            assert.deepEqual(res.status, authData.status[201])
            assert.jsonSchema(res.body, authData._registerUser.registerUserSchema)
            assert.equal(res.body.user_id, _newUser.id)
            assert.notEqual(res.body.access_token, _userToken)
            assert.equal(res.body.expires_in, 3600)

            //updating token with new refreshed token
            _userToken = res.body.access_token
            _userTokenJson = JSON.parse(`{"Authorization" : "Bearer ${_userToken}"}`)
        })
        _i++
    }

    it(`Negative -Refreshing same Token again`, async function () {

        //Making request to refresh the token for first time
        var res = await authHelper.refreshToken(this, _newUser2.token)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[201])

        //Making request to refresh the same token again
        res = await authHelper.refreshToken(this, _newUser2.token)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[400])
        assert.equal(res.body.message, authData.commonMsgs.tokenBlacklisted)
    })
})