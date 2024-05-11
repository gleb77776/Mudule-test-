const path = require('path');
const BasePage = require(path.join(__dirname, 'basepage'));
const { Builder, Browser, By } = require('selenium-webdriver')
const { assert } = require('chai')

class LambdaPage extends BasePage {
    constructor(remaining, total) {
        super();
        this.remaining = remaining;
        this.total = total;
    }

    async open() {
        await this.goToUrl('https://lambdatest.github.io/sample-todo-app/');
    }

    async getHeading() {
        return await this.getElText(By.xpath('//h2'));
    }

    async checkRemaining() {
        return await this.getElText(By.xpath('//span[@class="ng-binding"]')) === `${this.remaining} of ${this.total} remaining`;
    }

    async getListItem(order) {
        return await driver.findElement(By.xpath(`//ul[@class="list-unstyled"]/child::li[position()=${order}]`));
    }

    async clickItem(item) {
        await item.findElement(By.tagName('input')).click();
        this.remaining--;
    }

    async isItemActive(item) {
        return await item.findElement(By.tagName('span')).getAttribute('class') === 'done-true';
    }

    async addItem(text) {
        await this.enterText(By.id('sampletodotext'), text);
        await this.click(By.id('addbutton'));
        this.remaining++;
        this.total++;
    }
}

module.exports = LambdaPage