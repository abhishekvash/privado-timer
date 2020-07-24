const puppeteer = require("puppeteer");
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

test("Initial screen shows all the right UI components", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5000/");
  const title = await page.$eval("h4", (e) => e.innerText);
  const timer = await page.$eval("#timer", (e) => e.innerText);
  const button = await page.$eval("#button", (e) => e.innerText);
  expect(title).toBe("PRIVADO TIMER");
  expect(timer).toBe("05:00");
  expect(button).toBe("Start");
  browser.close();
});

test("Clicking the button changes the button state appropriately", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5000/");
  await page.waitForSelector("body #button");
  let buttonText = await page.$eval("body #button", (e) => e.innerText);
  expect(buttonText).toBe("Start");
  await page.click("body #button");
  buttonText = await page.$eval("body #button", (e) => e.innerText);
  expect(buttonText).toBe("Pause");
  await page.click("body #button");
  buttonText = await page.$eval("body #button", (e) => e.innerText);
  expect(buttonText).toBe("Start");
  browser.close();
});

test("Timer is chronologically accurate", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5000/");
  await page.waitForSelector("body #button");
  await page.waitForSelector("body #timer");
  let timerText = await page.$eval("body #timer", (e) => e.innerText);
  expect(timerText).toBe("05:00");
  await page.click("body #button");
  await sleep(2000);
  await page.click("body #button");
  timerText = await page.$eval("body #timer", (e) => e.innerText);
  expect(timerText).toBe("04:58");
  await page.click("body #button");
  await sleep(20000);
  await page.click("body #button");
  timerText = await page.$eval("body #timer", (e) => e.innerText);
  expect(timerText).toBe("04:38");
  await browser.close();
});

test("TimerUI behaves approriately on timeout, leading to reset", async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5000/");
  await page.waitForSelector("body #button");
  await page.waitForSelector("body #timer");
  let timerText = await page.$eval("body #timer", (e) => e.innerText);
  expect(timerText).toBe("00:10");
  await page.click("body #button");
  //Change the value of the parameter for sleep appropriate to maxTimout
  await sleep(10000);
  let buttonText = await page.$eval("body #button", (e) => e.innerText);
  expect(buttonText).toBe("Reset");
  timerText = await page.$eval("body #timer", (e) => e.innerText);
  expect(timerText).toBe("00:00");
  let timerColor = await page.$eval("body #timer", (e) => e.style.color);
  expect(timerColor).toBe("rgb(155, 0, 13)");
  await page.click("body #button");
  timerText = await page.$eval("body #timer", (e) => e.innerText);
  buttonText = await page.$eval("body #button", (e) => e.innerText);
  timerColor = await page.$eval("body #timer", (e) => e.style.color);
  expect(timerText).toBe("00:10");
  expect(buttonText).toBe("Start");
  expect(timerColor).toBe("rgb(240, 224, 255)");
  await browser.close();
});
