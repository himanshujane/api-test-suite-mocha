import {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import authData from '../../../dataProvider/auth.data.js'


describe('@INTEGRATION -Refresh user token and validate new token and blacklisted token', function () {

    var _newUser = Object
    var _newToken = Object

    it(`Register a user`, async function () {

        //Using helper function to register a new user
        _newUser = await authHelper.getNewUser(this)

        //Asserting the Response
        assert.isAbove(_newUser.id, 0)
    })

    it(`Refresh user Token`, async function () {

        //Making request to refresh the token
        const res = await authHelper.refreshToken(this, _newUser.jsonToken)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[201])
        assert.equal(res.body.user_id, _newUser.id)
        assert.notEqual(res.body.access_token, _newUser.token)

        //Extracting the new user token
        _newToken = {
            jsonToken: await authHelper.getJsonToken(res.body.access_token),
            token: res.body.access_token
        }
    })

    it(`Given token is refreshed - validate get user using new token`, async function () {

        //Making request to login user
        const res = await authHelper.getUser(this, _newToken.jsonToken)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[200])
    })

    it(`Given token is refreshed - validate get user using old token should be unsuccessful`, async function () {

        //Making request to login user
        const res = await authHelper.getUser(this, _newUser.jsonToken)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[401])
    })

    it(`Given token is refreshed - validate delete user using old token should be unsuccessful`, async function () {

        //Making request to delete user
        const res = await authHelper.deleteUser(this, _newUser.jsonToken, _newUser.id)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[401])
    })
})