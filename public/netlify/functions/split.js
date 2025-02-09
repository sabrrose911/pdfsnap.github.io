const { PDFDocument } = require('pdf-lib');

exports.handler = async (event) => {
  const { file, pages } = JSON.parse(event.body);
  const pdfDoc = await PDFDocument.load(file);
  const newPdf = await PDFDocument.create();

  pages.split(',').forEach(page => {
    const [start, end] = page.split('-').map(Number);
    for (let i = start; i <= end; i++) {
      newPdf.addPage(pdfDoc.getPages()[i - 1]);
    }
  });

  const splitBytes = await newPdf.save();
  return {
    statusCode: 200,
    body: splitBytes.toString('base64'),
    headers: { 'Content-Type': 'application/pdf' }
  };
};