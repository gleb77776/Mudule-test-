const LambdaPage = require('../pages/lambda_page')
const mocha = require('mocha');
const chai = require('chai');

mocha.describe('Lambda test', async () => {
    const lp = new LambdaPage(5, 5);

    before(async () => {
        await lp.open();
    });

    after(async () => {
        await lp.closeBrowser();
    });

    it('opens Lambda page and checks for title', async () => {
        chai.assert.equal(await lp.getHeading(), 'LambdaTest Sample App');
    });

    it('checks that list remaining text is present', async () => {
        chai.assert.equal(await lp.checkRemaining(), true);
    });

    it('checks that first element is not done', async () => {
        chai.assert.equal(await lp.isItemActive(await lp.getListItem(1)), false);
    });

    it('clicks the first element and checks if it becomes active and remaining text changes respectively', async () => {
        await lp.clickItem(await lp.getListItem(1));

        chai.assert.equal(await lp.isItemActive(await lp.getListItem(1)), true);
        chai.assert.equal(await lp.checkRemaining(), true);
    });

    it('checks if other list items are not active and clicks them and checks if they become active and remaining text changes respectively', async () => {
        for(let i = 2; i <= lp.total; i++) {
            chai.assert.equal(await lp.isItemActive(await lp.getListItem(i)), false);
            await lp.clickItem(await lp.getListItem(i));

            chai.assert.equal(await lp.isItemActive(await lp.getListItem(i)), true);
            chai.assert.equal(await lp.checkRemaining(), true);
        }
    });

    it('adds new list item', async () => {
        await lp.addItem('4iterok007');

        chai.assert.equal(await lp.isItemActive(await lp.getListItem(lp.total)), false);
        chai.assert.equal(await lp.checkRemaining(), true);
    });

    it('clicks new element', async () => {
        await lp.clickItem(await lp.getListItem(lp.total));
        chai.assert.equal(await lp.checkRemaining(), true);
    });
});