import chai, {
    assert
} from 'chai'
import dataProvider from '../../../dataProvider/testdata.js'
import helper from '../../../helper/auth.helper.js'
import endpoints from '../../../helper/endpoints.helper.js'
chai.use(require('chai-json-schema'))

describe('Test User Registration - Endpoint: ' + endpoints.registerUserURL, function () {

    it('P-Registering a user with valid data', async function () {

        //Setting Data for test and adding context to Report
        const validData = dataProvider._registerUser.validData
        addContext(this, 'Data Used: ' + JSON.stringify(validData))

        //Making API request and saving response in a variable
        const res = await helper.registerUser(validData)

        //Asserting the Response
        assert.jsonSchema(await res.body, dataProvider._registerUser.registerUserSchema)
        assert.equal(await res.status, 201)
        assert.equal(await res.body.token_type, 'bearer')
        assert.isNotEmpty(await res.body.access_token)
        assert.equal(await res.body.expires_in, 3600)
        assert.isAbove(await res.body.user_id, 0)
        assert.equal(await res.headers.get('content-type'), "application/json")
    })
})