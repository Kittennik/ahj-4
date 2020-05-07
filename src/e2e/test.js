import puppetteer from 'puppeteer';

jest.setTimeout(30000);
describe('Validation', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      //headless: false,
      //slowMo: 100,
      //devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  test('Valid', async () => {
    await page.goto(baseUrl);
    const input = await page.$('input.number');
    const button = await page.$('button.check');
    await input.type('5555555555554444');
    await button.click();
    const result = await page.evaluate(() => document.getElementById('result').textContent);
    await expect(result).toBe('Valid');
  });

  test('Invalid', async () => {
    const input = await page.$('input.number');
    const button = await page.$('button.check');
    await input.type('55555555555544');
    await button.click();
    const result = await page.evaluate(() => document.getElementById('result').textContent);
    await expect(result).toBe('Not valid');
  });
});