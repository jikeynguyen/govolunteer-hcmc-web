import PDFGen from "./pdfgen.js";
import fs from 'fs/promises';

PDFGen({certiFile: './assets/.pdf', studentName: '', deptName: ''}).then(async (blob) => {
    const buffer = Buffer.from(await blob.arrayBuffer());
    const outputPath = './output/output.pdf';
    
    try {
      await fs.mkdir('./output', { recursive: true });
      await fs.writeFile(outputPath, buffer);
      console.log(`PDF successfully saved to: ${outputPath}`);
    } 
    catch (error) {
      console.error('Error saving PDF:', error);
    }
});