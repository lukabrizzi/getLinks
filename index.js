const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://www.dni.gov/index.php/newsroom/reports-publications"
  );
  const totalPdsLinks = [];

  const archives = await page.evaluate(() => {
    const archives = document.querySelectorAll(
      ".right-sidebar-menu .archive-list li a"
    );
    const titleLinks = [];

    for (let i = 0; i < archives.length; i++) {
      const href = archives[i].href;
      titleLinks.push(href);
    }
    return titleLinks;
  });

  for (let i = 0; i < archives.length; i++) {
    await page.goto(archives[i]);

    const titleLinks = await page.evaluate(() => {
      const titles = document.querySelectorAll("h3.catItemTitle a");
      const titleLinks = [];

      for (let i = 0; i < titles.length; i++) {
        const href = titles[i].href;
        titleLinks.push(href);
      }
      return titleLinks;
    });

    for (let i = 0; i < titleLinks.length; i++) {
      await page.goto(titleLinks[i]);

      const linksWithTitle = await page.evaluate(() => {
        const pdfs = document.querySelectorAll('.itemFullText a[href$=".pdf"]');
        const title = document.querySelector(".articleTitle").textContent;
        const links = [];
        for (let i = 0; i < pdfs.length; i++) {
          links.push(pdfs[i].href);
        }
        return { title: title, link: links };
      });
      totalPdsLinks.push({ ...linksWithTitle });
    }
  }

  fs.writeFile("document.txt", JSON.stringify(totalPdsLinks), function (error) {
    if (error) throw error;
    console.log("El archivo ha sido creado exitosamente.");
  });

  await browser.close();
})();
