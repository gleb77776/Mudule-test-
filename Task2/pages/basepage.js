const { Builder, Browser } = require('selenium-webdriver')

module.exports = class BasePage {
    async goToUrl(url) {
        global.driver = new Builder().forBrowser(Browser.CHROME).build();
        driver.manage().setTimeouts({implicit: 5000});
        await driver.get(url)
    }

    async getElText(locator) {
        return await driver.findElement(locator).getText();
    }

    async enterText(locator, text) {
        await driver.findElement(locator).sendKeys(text);
    }

    async click(locator) {
        await driver.findElement(locator).click();
    }

    async saveScreenshot(fileName) {
        driver.takeScreenshot().then((img) => {
            require('fs').writeFileSync(fileName, img, 'base64')
        });
    }

    async closeBrowser(delay = 0) {
        if (delay) await driver.sleep(delay);
        await driver.quit();
    }
}