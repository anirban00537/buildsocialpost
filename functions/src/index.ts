const functions = require("firebase-functions");
const puppeteer = require("puppeteer");
const { PDFDocument } = require("pdf-lib");
const cors = require("cors")({ origin: true });

exports.generatePdf = functions.https.onRequest((req: any, res: any) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send({ error: "Method not allowed" });
    }

    const { slideIds, layout } = req.body;

    if (!slideIds || !layout) {
      return res
        .status(400)
        .json({ error: "Slide IDs or layout data missing" });
    }

    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();

      await page.goto("https://buildcarousel.com/editor", {
        waitUntil: "networkidle0",
        timeout: 0,
      });

      const slides = await page.evaluate((ids:any) => {
        return ids
          .map((id:any) => {
            const element = document.getElementById(id);
            return element ? element.outerHTML : "";
          })
          .filter((html:any) => html !== "");
      }, slideIds);

      const pdfDocs = [];

      for (const slide of slides) {
        const slidePage = await browser.newPage();
        const content = `
          <html>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
            <style>
              body, html {
                margin: 0;
                padding: 0;
                width: ${layout.width}px;
                height: ${layout.height}px;
                font-family: 'Poppins', sans-serif;
              }
              .slide {
                width: ${layout.width}px;
                height: ${layout.height}px;
                font-family: 'Poppins', sans-serif;
              }
            </style>
          </head>
          <body>
            <div class="slide">${slide}</div>
          </body>
          </html>
        `;
        await slidePage.setContent(content, {
          waitUntil: "networkidle0",
          timeout: 0,
        });
        const pdfBuffer = await slidePage.pdf({
          width: layout.width,
          height: layout.height,
          printBackground: true,
          pageRanges: "1",
        });

        pdfDocs.push(pdfBuffer);
        await slidePage.close();
      }

      await browser.close();

      const mergedPdf = await PDFDocument.create();
      for (const pdfDoc of pdfDocs) {
        const pdf = await PDFDocument.load(pdfDoc);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((page: any) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="slides.pdf"');
      res.status(200).send(Buffer.from(mergedPdfBytes));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  });
});
