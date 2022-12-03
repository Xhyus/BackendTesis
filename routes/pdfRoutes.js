const express = require('express');
const router = express.Router();
// const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
// const hbs = require('handlebars');
const PDFMerger = require('pdf-merger-js');
const pdf = require('pdf-creator-node');

// const compile = async (templateName, data) => {
//     const filepath = path.join(process.cwd(), 'templates', `${templateName}.hbs`);
//     const html = fs.readFileSync(filepath, 'utf-8');
//     return hbs.compile(html)(data);
// }

// router.get("/pdf", async (req, res) => {
//     const name = {
//         firstName: "Sebastian",
//         lastName: "Jerez"
//     }
//     try {
//         const browser = await puppeteer.launch();
//         const merger = new PDFMerger();
//         const page = await browser.newPage();
//         const content = await compile('total', name)
//         await page.setContent(content);
//         await page.emulateMediaType('screen');
//         await page.pdf({
//             path: 'cotizacion.pdf',
//             format: 'A3',
//             printBackground: true,
//             landscape: true
//         });
//         await merger.add('cotizacion.pdf');
//         await merger.add('cotizacion.pdf');
//         await merger.save('cotizacion.pdf');
//         await browser.close();
//         return res.sendFile(path.join(__dirname, '../cotizacion.pdf'));
//     } catch (e) {
//         console.log(e)
//         if (fs.existsSync(path.join(__dirname, '../cotizacion.pdf'))) {
//             fs.unlinkSync(path.join(__dirname, '../cotizacion.pdf'));
//         }
//     }
// })

router.get("/pdf", async (req, res) => {
    const total = fs.readFileSync(path.join(__dirname, '../templates/total.html'), 'utf8');
    const servicio = fs.readFileSync(path.join(__dirname, '../templates/servicio.html'), 'utf8');

    const options = {
        format: "A4",
        orientation: "landscape",
        border: false,
        header: {},
        footer: {},
        type: "pdf"
    }

    const totalData = {
        total: "Total en letras",
        foto: "http://localhost:3001/assets/servicios.png"
    }

    const servicioData = {
        servicio: "Servicio en letras"
    }

    const totalDocument = {
        html: total,
        data: totalData,
        path: path.join(__dirname, '../total.pdf')
    }

    const servicioDocument = {
        html: servicio,
        data: servicioData,
        path: path.join(__dirname, '../servicio.pdf')
    }

    const merger = new PDFMerger();
    await pdf.create(totalDocument, options);
    await pdf.create(servicioDocument, options);
    await merger.add(path.join(__dirname, '../total.pdf'));
    await merger.add(path.join(__dirname, '../servicio.pdf'));
    await merger.save(path.join(__dirname, '../cotizacion.pdf'));
    return res.sendFile(path.join(__dirname, '../cotizacion.pdf'));

})

module.exports = router;