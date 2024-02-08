import puppeteer from "puppeteer";
const childProcess = require("child_process");

jest.setTimeout(30000); // default puppeteer timeout

describe("Show tooltip after click", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:8080";

  beforeAll(async () => {
    server = await childProcess.fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: true, // not show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test("should show tooltip after click close it on second click", async () => {
    await page.goto(baseUrl);
    const button = await page.$(".btn");
    await button.click();
    await page.waitForSelector(".arrow");
    // Проверяем, что тултип открыт
    const tooltip = await page.$(".arrow");
    expect(tooltip).not.toBeNull();

    // Второй клик для закрытия тултипа
    await button.click();

    // Проверяем, что тултип больше не отображается
    const tooltipClosed = await page.$(".arrow");
    expect(tooltipClosed).toBeNull();
  });
});
