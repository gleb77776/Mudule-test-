const path = require('path');
const BasePage = require(path.join(__dirname, 'basepage'));
const { Builder, Browser, By, Key } = require('selenium-webdriver')
const { assert } = require('chai')

class SchedulePage extends BasePage {
    async open() {
        await this.goToUrl('https://mospolytech.ru/');
    }

    async openSchedule() {
        await this.click(By.xpath('//ul[@class="user-nav__list"]//a[@href="/obuchauschimsya/raspisaniya/"]'));
        await driver.sleep(1500)
    }

    async openViewSchedule() {
        this.originalWindow = await driver.getWindowHandle();
        await this.click(By.xpath('//a[@href="https://rasp.dmami.ru/"]'));
        await driver.sleep(1000);
    }

    async fillInGroup() {
        const windows = await driver.getAllWindowHandles();
        for (const handle of windows) {
            if (handle !== this.originalWindow) {
                await driver.switchTo().window(handle);
            }
        }

        await this.enterText(By.xpath('//input[@class="groups"]'), '221-321');
        await driver.findElement(By.xpath('//input[@class="groups"]')).sendKeys(Key.ENTER);
    }

    async checkIfGroupInList() {
        return !!await driver.findElement(By.xpath('//div[@id="221-321"]'))
    }

    async goToGroupSchedule() {
        await this.click(By.xpath('//div[@id="221-321"]'));
    }

    async checkIfCurrentDayHighlighted() {
        return (await driver.findElement(By.xpath(`//div[@class="schedule-week"]/child::div[position()=${new Date().getDay()}]`)).getAttribute('class')).includes('schedule-day_today');
    }
}

module.exports = SchedulePage;