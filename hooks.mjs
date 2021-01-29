import fetch from 'node-fetch';

export const mochaHooks = {

    beforeAll() {    
        globalThis.fetch = fetch;
    }
}