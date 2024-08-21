const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const fetchSteamData = async (appid) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--single-process",
        "--disable-background-timer-throttling",
        "--disable-renderer-backgrounding",
      ],
    });

    const page = await browser.newPage();
    await page.goto(`https://steamdb.info/app/${appid}/charts/#followers`, {
      waitUntil: "networkidle2",
    });

    console.log("Page loaded successfully");

    // Debugging: Log the entire HTML of the targeted section
    const htmlContent = await page.evaluate(() => {
      return document.querySelector(".row.row-app-charts").innerHTML;
    });

    console.log("HTML Content:", htmlContent);

    await browser.close();

    return { htmlContent }; // You can change what is returned based on your need
  } catch (error) {
    console.error("Error fetching Steam data:", error.message);
    throw new Error("Failed to fetch Steam data.");
  }
};

module.exports = { fetchSteamData };
