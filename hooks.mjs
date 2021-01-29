import fetch from 'node-fetch';
import addContext from 'mochawesome/addContext.js'

export const mochaHooks = {

    beforeAll() {
        globalThis.fetch = fetch
        globalThis.addContext = addContext
    }
}