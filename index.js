const { shortenUrl } = require("./shortener");
(async () => {
  const short = await shortenUrl("https://rajondey.com");
  console.log(short); // e.g., https://tinyurl.com/abc123
})();
