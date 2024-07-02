import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";

export async function POST(req: Request) {
  const {
    slides,
    layout,
  }: { slides: string[]; layout: { width: number; height: number } } =
    await req.json();

  if (!slides || !layout) {
    return NextResponse.json(
      { error: "Slides or layout data missing" },
      { status: 400 }
    );
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const pdfDocs = [];

    for (const slide of slides) {
      const page = await browser.newPage();
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
              page-break-after: always;
            }
          </style>
        </head>
        <body>
          <div class="slide">${slide}</div>
        </body>
        </html>
      `;
      await page.setContent(content, { waitUntil: "networkidle0", timeout: 0 });
      const pdfBuffer = await page.pdf({
        width: layout.width,
        height: layout.height,
        printBackground: true,
        pageRanges: "1",
      });

      pdfDocs.push(pdfBuffer);
      await page.close();
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
