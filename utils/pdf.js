const markdownpdf = require("markdown-pdf");
const path = require("path");
const fs = require("fs-extra");

module.exports = async function generatePDF(report) {

  const mdPath = path.join(__dirname, "../reports/weekly_report.md");
  const pdfPath = path.join(__dirname, "../reports/weekly_report.pdf");

  // 1. Write markdown FIRST
  await fs.outputFile(mdPath, report);

  // 2. Convert FILE to PDF (not string)
  return new Promise((resolve, reject) => {
    markdownpdf()
      .from(mdPath)
      .to(pdfPath, function (err) {
        if (err) {
          console.error("PDF error:", err);
          reject(err);
          return;
        }

        console.log("PDF created successfully");
        resolve();
      });
  });
};