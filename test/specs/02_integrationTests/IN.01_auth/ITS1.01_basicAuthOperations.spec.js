import {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import authData from '../../../dataProvider/auth.data.js'


describe('@Integration -User journery for Auth operations', function () {

    var _reqData = Object
    var _reqData2 = Object
    var _userDetails = Object
    var _userCredential = Object

    it(`Registering a user`, async function () {

        //Setting test data
        _reqData = authData._registerUser.validData

        //Registering a new user
        const res = await authHelper.registerUser(this, _reqData)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[201])
        assert.isNotEmpty(res.body.access_token)
        assert.isAbove(res.body.user_id, 0)

        //Adding user details to global object
        _userDetails = {
            jsonToken: JSON.parse(`{"Authorization" : "Bearer ${res.body.access_token}"}`),
            token: res.body.access_token,
            id: res.body.user_id,
            name: _reqData.reqBody.name,
            email: _reqData.reqBody.email,
            password: _reqData.reqBody.password
        }
    })

    it(`Logging User`, async function () {

        //Setting testdata for request
        const userCredential = {
            "email": _userDetails.email,
            "password": _userDetails.password
        }

        //Making request to login user
        const res = await authHelper.loginUser(this, userCredential)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[201])
        assert.equal(res.body.user_id, _userDetails.id)
        assert.isNotEmpty(res.body.access_token)
        assert.equal(res.body.expires_in, 3600)

    })

    it(`Getting user details`, async function () {

        //Making request to get user details
        const res = await authHelper.getUser(this, _userDetails.jsonToken)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[200])
        assert.equal(res.body.data.id, _userDetails.id)
        assert.equal(res.body.data.name, _userDetails.name)
        assert.equal(res.body.data.email, _userDetails.email)
    })

    it(`Refreshing user Token`, async function () {

        //Making request to refresh the token
        const res = await authHelper.refreshToken(this, _userDetails.jsonToken)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[201])
        assert.equal(res.body.user_id, _userDetails.id)
        assert.notEqual(res.body.access_token, _userDetails.token)
        assert.equal(res.body.expires_in, 3600)
    })

    it(`Updating user details`, async function () {

        //Setting test data
        _reqData2 = authData._registerUser.updateUserData

        //Making request to update the user details
        const res = await authHelper.updateUser(this, _reqData2, _userDetails)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[200])
        assert.equal(res.body.data.id, _userDetails.id)
        assert.equal(res.body.data.name, _reqData2.reqBody.name)
        assert.equal(res.body.data.email, _reqData2.reqBody.email)
    })


    it(`Getting user details to check user is updated`, async function () {

        //Making request to get user details
        const res = await authHelper.getUser(this, _userDetails.jsonToken)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[200])
        assert.equal(res.body.data.id, _userDetails.id)
        assert.equal(res.body.data.name, _reqData2.reqBody.name)
        assert.equal(res.body.data.email, _reqData2.reqBody.email)
    })

    it(`Logging User with new email id and password`, async function () {

        //Setting testdata for request
        _userCredential = {
            "email": _reqData2.reqBody.email,
            "password": _reqData2.reqBody.password
        }

        //Making request to login user
        const res = await authHelper.loginUser(this, _userCredential)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[201])
        assert.equal(res.body.user_id, _userDetails.id)
        assert.isNotEmpty(res.body.access_token)
        assert.equal(res.body.expires_in, 3600)
    })


    it(`Deleting user`, async function () {

        //Making request to delete user
        const res = await authHelper.deleteUser(this, _userDetails.jsonToken, _userDetails.id)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[202])
        // assert.equal(res.body, "OK")
    })


    it(`Getting user details to check user is successfully deleted`, async function () {

        //Making request to get user details
        const res = await authHelper.getUser(this, _userDetails.jsonToken)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[401])
        assert.equal(res.body.message, authData.commonMsgs.unauthorized)
    })

    it(`Should not able to login given deleted user `, async function () {

        //Making request to login user
        const res = await authHelper.loginUser(this, _userCredential)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[418])
        assert.equal(res.body.errors.email, authData.commonMsgs.notInSystem)
    })
})