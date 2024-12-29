import { createBrowser } from "./CreateBrowser.js";
import NEWS from "./db/models/NEWS.model.js";
import dbConnect from "./db/dbConnect.js";

export async function AI_NEWS() {
  const URL = "https://www.artificialintelligence-news.com/artificial-intelligence-news/";

  try {
    // Initialize database connection
    await dbConnect();

    // Launch the browser and open the page
    const page = await createBrowser(URL);

    // Wait for the main section to load
    await page.waitForSelector("main.main");

    // Extract the article data in the browser context
    const articles = await page.evaluate(() => {
      const articleElements = document.querySelectorAll("main.main article");
      return Array.from(articleElements).map((article) => {
        const titleElement = article.querySelector("header.article-header h3 a");
        const thumbnailElement = article.querySelector("div.image img");
        const contentElement = article.querySelector("div.post-text p");
        const Id = article.id;

        return {
          Id,
          title: titleElement ? titleElement.textContent.trim() : null,
          link: titleElement ? titleElement.href : null,
          thumbnailUrl: thumbnailElement ? thumbnailElement.src : null,
          content: contentElement ? contentElement.textContent.trim() : null,
        };
      });
    });

    // console.log("Scraped articles:", articles);

    // Filter out duplicate articles by checking the database
    const uniqueArticles = [];
    for (const article of articles) {
      const exists = await NEWS.findOne({ articleId: article.Id });
      if (!exists) {
        uniqueArticles.push({
          articleId: article.Id,
          title: article.title,
          content: article.content,
          thumbnail: article.thumbnailUrl,
          link: article.link,
          source: "AI_NEWS",
        });
      }
    }

    // Save unique articles to the database
    if (uniqueArticles.length > 0) {
      await NEWS.insertMany(uniqueArticles);
      console.log("Unique articles saved to the database successfully.");
    } else {
      console.log("No new articles to save.");
    }

    // Close the browser
    await page.close();
  } catch (error) {
    console.error("Error in AI_NEWS function:", error);
  }
}

AI_NEWS();
