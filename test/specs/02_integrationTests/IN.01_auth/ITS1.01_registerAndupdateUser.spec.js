import {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import authData from '../../../dataProvider/auth.data.js'


describe('@INTEGRATION -Register user and update user details', function () {

    var _reqData = Object
    var _reqData2 = Object
    var _userDetails = Object

    it(`Register a user`, async function () {

        //Setting test data
        _reqData = authData._registerUser.validData

        //Registering a new user
        const res = await authHelper.registerUser(this, _reqData)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[201])
        assert.isNotEmpty(res.body.access_token)

        //Adding user details to global object
        _userDetails = {
            jsonToken: await authHelper.getJsonToken(res.body.access_token),
            token: res.body.access_token,
            id: res.body.user_id
        }
    })

    it(`Login user`, async function () {

        //Making request to login user
        const res = await authHelper.loginUser(this, _reqData.reqBody.email, _reqData.reqBody.password)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[201])
        assert.equal(res.body.user_id, _userDetails.id)
        assert.isNotEmpty(res.body.access_token)

    })

    it(`Get user details`, async function () {

        //Making request to get user details
        const res = await authHelper.getUser(this, _userDetails.jsonToken)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[200])
        assert.equal(res.body.data.id, _userDetails.id)
        assert.equal(res.body.data.name, _reqData.reqBody.name)
        assert.equal(res.body.data.email, _reqData.reqBody.email)
    })

    it(`Update user details`, async function () {

        //Setting test data
        _reqData2 = authData._registerUser.updateUserData

        //Making request to update the user details
        const res = await authHelper.updateUser(this, _reqData2, _userDetails, _reqData.reqBody.password)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[200])
        assert.equal(res.body.data.id, _userDetails.id)
        assert.equal(res.body.data.name, _reqData2.reqBody.name)
        assert.equal(res.body.data.email, _reqData2.reqBody.email)
    })

    it(`Given user credential updated - validate login with old credential should be unsuccessful`, async function () {

        //Making request to login user
        const res = await authHelper.loginUser(this, _reqData.reqBody.email, _reqData.reqBody.password)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[401])
    })

    it(`Login user with new email id and password`, async function () {

        //Making request to login user
        const res = await authHelper.loginUser(this, _reqData2.reqBody.email, _reqData2.reqBody.password)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[201])
        assert.equal(res.body.user_id, _userDetails.id)
        assert.isNotEmpty(res.body.access_token)
    })

    it(`Given user details are updated - validate get user details should return updated user details`, async function () {

        //Making request to get user details
        const res = await authHelper.getUser(this, _userDetails.jsonToken)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[200])
        assert.equal(res.body.data.id, _userDetails.id)
        assert.equal(res.body.data.name, _reqData2.reqBody.name)
        assert.equal(res.body.data.email, _reqData2.reqBody.email)
    })
})