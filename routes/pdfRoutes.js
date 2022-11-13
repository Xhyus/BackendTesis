const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');
const PDFMerger = require('pdf-merger-js');

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
        const merger = new PDFMerger();
        const page = await browser.newPage();
        const content = await compile('invoice', name)
        await page.setContent(content);
        await page.emulateMediaType('screen');
        await page.pdf({
            path: 'cotizacion.pdf',
            format: 'A3',
            printBackground: true,
            landscape: true
        });
        await merger.add('cotizacion.pdf');
        await merger.add('cotizacion.pdf');
        await merger.save('cotizacion.pdf');
        await browser.close();
        return res.sendFile(path.join(__dirname, '../cotizacion.pdf'));
    } catch (e) {
        console.log(e)
        if (fs.existsSync(path.join(__dirname, '../cotizacion.pdf'))) {
            fs.unlinkSync(path.join(__dirname, '../cotizacion.pdf'));
        }
    }
})

module.exports = router;