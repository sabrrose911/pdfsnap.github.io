// PDF Conversion
async function convert(format) {
  try {
    const input = format === 'word' ? document.getElementById('pdfToWord') : document.getElementById('pdfToPPT');
    const file = input.files[0];
    
    if (!file) {
      alert('Please select a PDF file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);

    const response = await fetch('/.netlify/functions/convert', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Conversion failed');
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${format === 'word' ? 'docx' : 'pptx'}`;
    a.click();
    
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

// PDF Merging
async function mergePDFs() {
  const files = document.getElementById('mergeFiles').files;
  if (files.length < 2) {
    alert('Please select at least 2 PDF files!');
    return;
  }

  try {
    const formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    const response = await fetch('/.netlify/functions/merge', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Merge failed');
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'merged.pdf';
    a.click();

  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}