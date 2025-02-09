class PDFTools {
  // PDF to Word/Excel/PPT
  async convertToOffice(file, format) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);

    const response = await fetch('/.netlify/functions/convert', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Conversion failed');
    return await response.blob();
  }

  // Merge PDFs
  async mergePDFs(files) {
    const formData = new FormData();
    files.forEach((file, i) => formData.append(`file${i}`, file));

    const response = await fetch('/.netlify/functions/merge', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Merge failed');
    return await response.blob();
  }

  // Split PDF
  async splitPDF(file, pages) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pages', pages);

    const response = await fetch('/.netlify/functions/split', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Split failed');
    return await response.blob();
  }

  // Compress PDF
  async compressPDF(file, quality) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('quality', quality);

    const response = await fetch('/.netlify/functions/compress', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Compression failed');
    return await response.blob();
  }
}