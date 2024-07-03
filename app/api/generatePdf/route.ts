import { NextResponse } from "next/server";
import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import { PDFDocument } from "pdf-lib";

export async function POST(req: Request) {
  const {
    slideIds,
    layout,
  }: { slideIds: string[]; layout: { width: number; height: number } } =
    await req.json();

  if (!slideIds || !layout) {
    return NextResponse.json(
      { error: "Slide IDs or layout data missing" },
      { status: 400 }
    );
  }

  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });

    const page = await browser.newPage();

    // Navigate to the /editor page
    await page.goto("http://localhost:3000/editor", {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    // Extract the HTML content of slides by IDs
    const slides = await page.evaluate((ids) => {
      return ids
        .map((id) => {
          const element = document.getElementById(id);
          return element ? element.outerHTML : "";
        })
        .filter((html) => html !== "");
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

    // Merge PDFs
    const mergedPdf = await PDFDocument.create();
    for (const pdfDoc of pdfDocs) {
      const pdf = await PDFDocument.load(pdfDoc);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();

    return new NextResponse(mergedPdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=slides.pdf",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
}
