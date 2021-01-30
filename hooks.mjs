import fetch from 'node-fetch';
import addContext from 'mochawesome/addContext.js'

/**
 * This is root hook plugin file which helps in following case like
 *  - To set something before all test suite
 *  - To set something before test in every suite
 * 
 * List of available hooks
 * beforeAll:
 * In serial mode (Mocha’s default), before all tests begin, once only
 * In parallel mode, run before all tests begin, for each file
 * 
 * beforeEach:
 * In both modes, run before each test
 * 
 * afterAll:
 * In serial mode, run after all tests end, once only
 * In parallel mode, run after all tests end, for each file
 * 
 * afterEach:
 * In both modes, run after every test
 */
export const mochaHooks = {

    beforeAll() {
        globalThis.fetch = fetch
        globalThis.addContext = addContext
    }
}