import {
    assert
} from 'chai'
import authHelper from '../../../helper/auth.helper.js'
import authData from '../../../dataProvider/auth.data.js'


describe('@INTEGRATION -Delete user and validate user is successfully deleted', function () {

    var _newUser = Object

    it(`Register a user`, async function () {

        //Using helper function to register a new user
        _newUser = await authHelper.getNewUser(this)

        //Asserting the Response
        assert.isAbove(_newUser.id, 0)
    })

    it(`Delete the user`, async function () {

        //Making request to delete user
        const res = await authHelper.deleteUser(this, _newUser.jsonToken, _newUser.id)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[202])
    })


    it(`Given user is deleted - validate get user details should be unsuccessful`, async function () {

        //Making request to get user details
        const res = await authHelper.getUser(this, _newUser.jsonToken)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[401])
        assert.equal(res.body.message, authData.commonValues.unauthorized)
    })

    it(`Given user is deleted - validate login is unsuccessful`, async function () {

        //Making request to login user
        const res = await authHelper.loginUser(this, _newUser.email, _newUser.password)

        //Asserting the Response
        assert.deepEqual(res.status, authData.status[401])
        assert.equal(res.body.errors.email, authData.commonValues.notInSystem)
    })
})