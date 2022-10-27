const { Builder, By } = require("selenium-webdriver");
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

    // elm = driver.findElement(By.className("js-svps"));

    elm = driver.findElement(By.css(".js-svps > option:nth-child(19)"));

    const setPeopleCount = (count) => driver.findElement(By.css(".js-svps > option:nth-child(19)")).click();

    elm.click();
    console.log(elm);
    await driver.sleep(10000);
    // タイトル取得
    const title = await driver.getTitle();

    // 比較検証
    assert.equal(title, "Top | rbell");
  });
});
