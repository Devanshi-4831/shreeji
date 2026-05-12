import fs from 'fs';

async function parse() {
  try {
    const pdf = (await import('pdf-parse')).default || await import('pdf-parse');
    const pdfPath = '../shreeji data .pdf';
    const outPath = '../parsed_pdf.txt';
    let dataBuffer = fs.readFileSync(pdfPath);
    
    // Sometimes pdf is nested inside default
    const pdfFn = typeof pdf === 'function' ? pdf : (pdf.default || pdf.PDFParse);
    
    if (typeof pdfFn !== 'function') {
        console.error("Could not find pdf function. Keys:", Object.keys(pdf));
        return;
    }
    
    const data = await pdfFn(dataBuffer);
    fs.writeFileSync(outPath, data.text);
    console.log("PDF parsed successfully. Total pages:", data.numpages);
  } catch (err) {
    console.error("Error:", err);
  }
}

parse();
