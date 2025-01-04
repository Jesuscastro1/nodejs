
const puppeteer = require('puppeteer');
const fs = require('fs/promises');

const scrapeWebsite = async(url) =>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector('.team-row');

    const teamow = await page.evaluate(() => {
        const teamScore = document.querySelectorAll('.team-row');
        //.slice just choose how many u want it to select it from! 
        return Array.from(teamScore).slice(0, n).map((div) => {
            const team = div.querySelector('a').innerText;
            const points = div.querySelector('div > :nth-child(2)').innerText;
            return {team,points};
    });

    });
    const formattedData = teamow.map(item => `Team: ${item.team}, Points: ${item.points}`).join("\r\n");

    await fs.writeFile('scores.txt', formattedData);
  
    await browser.close();
};


scrapeWebsite(//URL U WANT TO GET THE TEAM NAME AND SCORES FROM );
