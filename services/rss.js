const Parser = require("rss-parser");
const parser = new Parser();

const feeds = [
  "https://techcrunch.com/feed/",
  "https://www.theverge.com/rss/index.xml"
];

async function search(topic) {
  let results = [];

  for (const feed of feeds) {
    const data = await parser.parseURL(feed);

    data.items.forEach(item => {
      if (item.title.toLowerCase().includes(topic.toLowerCase())) {
        results.push({
          title: item.title,
          url: item.link,
          date: item.pubDate,
          relevanceScore: 0.8
        });
      }
    });
  }

  return results;
}

module.exports = { search };