import chromium from "@sparticuz/chromium";
import puppeteer, { Browser } from "puppeteer-core";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const handler = async () => {
  let browser: Browser | null = null;

  try {
    console.log("launching browser...");
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: "new",
      ignoreHTTPSErrors: true,
    });

    console.log("new page...");
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    console.log("going to page...");
    await page.goto("https://northwestbarberco.resurva.com/login", {
      waitUntil: "networkidle0",
      referer: "https://www.northwestbarberco.com/",
    });

    console.log("screenshotting...");
    const screenshot = await page.screenshot({ path: "./screenshot.jpg" });

    // const s3Client = new S3Client({});
    // const putObject = new PutObjectCommand({
    //   Bucket: process.env.SCREENSHOT_BUCKET_NAME,
    //   Key: "page-screenshot.jpg",
    //   Body: screenshot,
    // });

    // await s3Client.send(putObject);
  } finally {
    console.log("closing...");
    await browser?.close();
  }

  return {
    statusCode: 200,
    body: "good job",
  };
};
