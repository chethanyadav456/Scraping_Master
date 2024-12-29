import puppeteer from 'puppeteer-core';
import { config } from '../config.js';
const { URL, BROWSER_WS } = config;

/**
 * 
 * @param {URL} url - The URL to scrape the page.
 * @returns 
 */
export async function createBrowser(url) {
    const browser = await puppeteer.connect({
        browserWSEndpoint: BROWSER_WS,
        defaultViewport: null,
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}
