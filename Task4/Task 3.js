const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

async function testMicrosoftSite() {
  const driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().window().maximize();

  try {
    const microsoftPage = new MicrosoftMainPage(driver);
    await microsoftPage.navigateToPage();

    const menuItems = {
      'Microsoft 365': 'Microsoft 365 — подписка на приложения Office | Microsoft 365',
      'Teams': 'Видеоконференции, собрания и звонки | Microsoft Teams',
      'Windows': 'Помощь и обучение по Windows',
    };

    for (const [itemName, expectedTitle] of Object.entries(menuItems)) {
      await microsoftPage.clickMenuItem(itemName);
      await driver.wait(until.titleContains(expectedTitle.split('|')[0].trim()), 10000);
      assert(driver.title.includes(expectedTitle));
      await driver.navigate().back();
    }

    await microsoftPage.clickMenuItem('Поддержка');

    const supportText = 'Всё хорошо, я просто панкую тестирование';
    await microsoftPage.inputSupportText(supportText);

    const inputValue = await microsoftPage.getInputValue();
    assert.strictEqual(inputValue, supportText, `Expected input value to be '${supportText}', but got '${inputValue}'`);
  } finally {
    await driver.quit();
  }
}

class MicrosoftMainPage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigateToPage() {
    await this.driver.get('https://www.microsoft.com/');
  }

  async clickMenuItem(itemName) {
    const menuItem = await this.driver.findElement(By.linkText(itemName));
    await menuItem.click();
  }

  async inputSupportText(text) {
    const supportInput = await this.driver.findElement(By.id('support-text'));
    await supportInput.sendKeys(text);
  }

  async getInputValue() {
    const supportInput = await this.driver.findElement(By.id('support-text'));
    return await supportInput.getAttribute('value');
  }
}

testMicrosoftSite();
