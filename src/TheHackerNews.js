import { createBrowser } from "./CreateBrowser.js";
import NEWS from "./db/models/NEWS.model.js";
import dbConnect from "./db/dbConnect.js";

export async function HACKER_NEWS() {
  const URL = "https://thehackernews.com/";

  try {
    await dbConnect();

    const page = await createBrowser(URL);

    await page.waitForSelector(".blog-posts"); // Ensures the content is loaded

    // Extract the article data in the browser context
    const articles = await page.evaluate(() => {
      const articleElements = document.querySelectorAll(".body-post.clear");
      
      // Check if articles are correctly selected
      console.log(`Found ${articleElements.length} articles`);

      return Array.from(articleElements).map((article) => {
        const titleElement = article.querySelector("h2.home-title");
        const thumbnailElement = article.querySelector("div.img-ratio img");
        const contentElement = article.querySelector("div.home-desc");
        const linkElement = article.querySelector("a.story-link");

        if (!linkElement) return null; // Skip if no link is found

        const parsedURL = new URL(linkElement.href);
        const id = parsedURL.pathname.split("/").pop().replace(".html", "");

        return {
          id,
          title: titleElement ? titleElement.textContent.trim() : null,
          link: linkElement ? linkElement.href : null,
          thumbnailUrl: thumbnailElement ? thumbnailElement.src : null,
          content: contentElement ? contentElement.textContent.trim() : null,
        };
      }).filter(Boolean); // Remove null entries if any

    });

    // console.log("Scraped articles:", articles);

    const uniqueArticles = [];
    for (const article of articles) {
      const exists = await NEWS.findOne({ articleId: article.id });
      if (!exists) {
        uniqueArticles.push({
          articleId: article.id,
          title: article.title,
          content: article.content,
          thumbnail: article.thumbnailUrl,
          link: article.link,
          source: "HACKER_NEWS",
        });
      }
    }

    if (uniqueArticles.length > 0) {
      await NEWS.insertMany(uniqueArticles);
      console.log("Unique articles saved to the database successfully.");
    } else {
      console.log("No new articles to save.");
    }
    await page.browser().close();
  } catch (error) {
    console.error("Error in HACKER_NEWS function:", error);
  }
}

HACKER_NEWS();
