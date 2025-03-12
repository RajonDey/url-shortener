// index.js
const { program } = require("commander"); // npm package for CLI
const { shortenUrl, loadUrls, emitter } = require("./shortener");

program.version("1.0.0").description("CLI URL Shortener");

program
  .command("shorten <url>")
  .description("Shorten a URL")
  .action(async (url) => {
    const short = await shortenUrl(url);
    console.log(`Shortened: ${short}`);
  });

program
  .command("list")
  .description("List all shortened URLs")
  .action(() => {
    const urls = loadUrls();
    console.table(urls);
  });

emitter.on("urlShortened", ({ long, short }) =>
  console.log(`Shortened ${long} to ${short}`)
);

program.parse(process.argv); // Parse CLI args
