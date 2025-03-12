// shortener.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const EventEmitter = require("events");

const emitter = new EventEmitter();
const file = path.join(__dirname, "urls.json"); // Path to JSON file
const loadUrls = () => { 
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")); // Read JSON file
  } catch (e) {
    return {}; // Return empty object if file doesn’t exist
  }
};

const saveUrls = (urls) => {
  fs.writeFileSync(file, JSON.stringify(urls, null, 2)); // Write JSON, formatted
};

const shortenUrl = async (url) => {
  const urls = loadUrls(); // Load URLs from file
  if (urls[url]) return urls[url]; // Return cached URL if exists

  const response = await axios.get(
    `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
  );

  urls[url] = response.data; // Cache URL
  saveUrls(urls); // Save URLs to file

  emitter.emit("urlShortened", { long: url, short: urls[url] }); // Emit event

  return urls[url]; // Return shortened URL 
};

module.exports = { shortenUrl, loadUrls, emitter }; // Export function for reuse