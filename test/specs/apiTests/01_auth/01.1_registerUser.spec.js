import {assert} from 'chai'

/**
 * This suite covers tests for "Registering a user" with all the possible positive and negative scenarios
 */

describe('Test User Creation', function () {

    it('Registering a user with valid data', async function () {

        //Setting Data for test
        const reqURL = "http://localhost:8000/api/v1/auth/register"
        const validData = {
            reqBody: {
                "name": "Roy",
                "email": "test@test.com",
                "password": "password",
                "password_confirmation": "password"
            },
            reqHeader: {
                'Content-Type': 'application/json'
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: validData.reqHeader,
            body: JSON.stringify(validData.reqBody),
            timeout: 10000
        }

        //Making API request and saving response in a variable
        var res = await fetch(reqURL, requestOptions).then(response => response.json().then(json => {
            return {
                status: response.status,
                statusText: response.statusText,
                body: json,
                headers: response.headers
            }
        }))

        //Asserting the Response
        assert.equal(await res.status, 201)
        assert.equal(await res.body.token_type, 'bearer')
        assert.isNotEmpty(await res.body.access_token)
        assert.equal(await res.body.expires_in, 3600)
        assert.isAbove(await res.body.user_id, 0)
        assert.equal(await res.headers.get('content-type'), "application/json")


    })
})