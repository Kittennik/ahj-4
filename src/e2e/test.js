import puppetteer from 'puppeteer';

const { fork } = require('child_process');

jest.setTimeout(30000);
describe('Validation', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppetteer.launch({
      //headless: false,
      //slowMo: 100,
      //devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
    server.kill();
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
