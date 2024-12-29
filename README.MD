> [!NOTE]
> I created this project for the Bright Data Web Scraping Challenge, utilizing Bright Data's Scraping Browser to extract dynamic data from interactive websites.

# Scraping Master

This is a web scraping project that scrapes the various websites for the latest technological news and updates. The project is built using javascript and node.js. The project uses the puppeteer library to scrape the websites. The project scrapes the following websites:

1. [Artificial Intelligence](https://www.artificialintelligence-news.com/artificial-intelligence-news/)
2. [The Hacker News](https://thehackernews.com/)


Challenge: [Bright Data Web Scraping Challenge](https://dev.to/devteam/join-us-for-the-bright-data-web-scraping-challenge-3000-in-prizes-3mg2?)

Submitted Post Link: [Bright Data Web Scraping Challenge Submission](https://dev.to/chethanyadav/the-tech-news-scraper-14kc)

## Installation
1. Clone the repository
```bash
git clone https://github.com/chethanyadav456/Scraping_Master.git
```
2. Run `npm install` to install the dependencies
```bash
npm install
```
3. Run `node master.js` to start the project
```bash
node master.js
```
4. Create a `.env` file in the root directory and add the following environment variables
```env
MONGO_URI=
BROWSER_WS=
```
5. Add the MongoDB URI in the `MONGO_URI` variable
6. Add the browser websocket URL in the `BROWSER_WS` variable

## Usage
The project scrapes the websites and stores the data in the MongoDB database. The project uses the Bright Data Scraping Browser to scrape the websites. The project uses the puppeteer library to scrape the websites. The project scrapes the following websites:

1. [Artificial Intelligence](https://www.artificialintelligence-news.com/artificial-intelligence-news/)
2. [The Hacker News](https://thehackernews.com/)

The project scrapes the following data from the websites:

1. Title
2. Description
3. URL
4. Image URL
5. Published Date

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Author
[Chethan Yadav](https://github.com/chethanyadav456)
