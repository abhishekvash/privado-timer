const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5000/");
  await page.screenshot({ path: "example.png" });
})();
