// test.js
const assert = require("node:assert/strict");
const { shortenUrl, loadUrls } = require("./shortener");

(async () => {
  const url = "https://example.com";
  const short = await shortenUrl(url);
  assert.ok(short.startsWith("https://tinyurl.com"), "Not a TinyURL"); // Check format
  assert.strictEqual(loadUrls()[url], short, "URL not cached"); // Check cache
  console.log("Tests passed!");
})();
