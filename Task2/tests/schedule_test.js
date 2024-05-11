const SchedulePage = require('../pages/schedule_page')
const mocha = require('mocha');
const chai = require('chai');

mocha.describe('Lambda test', async () => {
    const sp = new SchedulePage();

    before(async () => {
        await sp.open();
    });

    after(async () => {
        await sp.closeBrowser();
    });

    it('opens schedule page', async () => {
        await sp.openSchedule();
    });

    it('opens schedule view page', async () => {
        await sp.openViewSchedule();
    });

    it('fills in group', async () => {
        await sp.fillInGroup();
    });

    it('checks if needed group is there', async () => {
        chai.assert.equal(await sp.checkIfGroupInList(), true);
    });

    it('goes to group schedule', async () => {
        await sp.goToGroupSchedule();
    });

    it('checks if current day is highlighted', async () => {
        chai.assert.equal(await sp.checkIfCurrentDayHighlighted(), true);
    })
});