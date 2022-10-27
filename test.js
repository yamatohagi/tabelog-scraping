const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

let driver;

describe("selenium test section 1", () => {
  before(() => {
    driver = new Builder().forBrowser("chrome").build();
  });

  after(() => {
    return driver.quit();
  });

  it("ページタイトルチェック", async () => {
    // ウィンドウ最大化
    driver.manage().window().maximize();

    // サイトへ遷移
    await driver.get("https://tabelog.com/kanagawa/A1401/A140104/14003794/party/");

    await getSeatAvailability();

    await driver.sleep(10000);
  });
});

const clickPeopleCount = (count) => driver.findElement(By.css(`.js-svps > option:nth-child(${count})`)).click();
const waitReserveTimeLoad = async (count) => await driver.wait(until.elementLocated(By.css(".js-svt")), 5000);
const waitPeopleCountLoad = async (count) => await driver.wait(until.elementLocated(By.css(".js-svps")), 5000);
const getReserveTimeOptions = () => driver.findElement(By.css(`.js-svt`));
const getFirstCalendarElem = () => driver.findElement(By.css(`.js-week-wrap`));
const isPossibleReserve = (classTest) => classTest.match(/js-calendar-day-target/) !== null;
const clickPtags = async () => {
  const pTags = await getFirstCalendarElem().findElements(By.css("p"));
  for (let p of pTags) {
    if (isPossibleReserve(await p.getAttribute("class"))) {
      console.log(await p.getText());

      driver.executeScript("arguments[0].click();", p);
      await driver.sleep(3000);

      console.log({ 日: await p.getText(), 時間: await getReserveTimeOptions().getText() });
    }
  }
};

const getSeatAvailability = async () => {
  await waitPeopleCountLoad();
  clickPeopleCount(1);
  console.log("1人");
  await waitReserveTimeLoad();
  await clickPtags();

  await waitPeopleCountLoad();
  console.log("2人");
  clickPeopleCount(2);
  await waitReserveTimeLoad();
  await clickPtags();

  await waitPeopleCountLoad();
  clickPeopleCount(3);
  console.log("3人");
  await waitReserveTimeLoad();
  await clickPtags();

  await waitPeopleCountLoad();
  clickPeopleCount(3);
  console.log("4人");
  await waitReserveTimeLoad();
  await clickPtags();
};
