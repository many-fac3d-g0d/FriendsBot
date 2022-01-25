const friendsBot = require('../FriendsBot');
const mocha = require('mocha');
const chai = require('chai');

const expect = chai.expect;

describe('FriendsBot API Test 🥤', function (){

    it('expect the data to have a serial no', async () => {
        let data = await friendsBot.startBot(true);
        expect(data).to.have.property('sNo');
    })

    it('expect the  serial not be zero', async () => {
        let data = await friendsBot.startBot(true);
        expect(parseInt(data.sNo)).to.not.equal(0);
    })
    
    it('expect the data to have a quote', async () => {
        let data = await friendsBot.startBot(true);
        expect(data).to.have.property('quote');
    })
})