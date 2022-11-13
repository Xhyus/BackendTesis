const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');

const compile = async (templateName, data) => {
    const filepath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
    const html = fs.readFileSync(filepath, 'utf-8');
    return hbs.compile(html)(data);
}

router.get("/pdf", async (req, res) => {
    const name = {
        firstName: "Sebastian",
        lastName: "Jerez"
    }
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const content = await compile('invoice', name);
        await page.setContent(content);
        await page.emulateMediaType('screen');
        await page.pdf({
            path: 'cotizacion.pdf',
            format: 'A4',
            printBackground: true
        });
        await browser.close();
        return res.sendFile(path.join(__dirname, '../cotizacion.pdf'));

    } catch (e) {
        console.log(e)
    }



})

module.exports = router;