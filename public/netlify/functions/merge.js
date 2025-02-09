const { PDFDocument } = require('pdf-lib');

exports.handler = async (event) => {
  const files = Object.values(event.body);
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    pages.forEach(page => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  return {
    statusCode: 200,
    body: mergedBytes.toString('base64'),
    headers: { 'Content-Type': 'application/pdf' }
  };
};