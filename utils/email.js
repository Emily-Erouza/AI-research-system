// const nodemailer = require("nodemailer");

// async function sendReport(pdfPath) {

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   await transporter.verify(); // 👈 IMPORTANT DEBUG STEP

//   await transporter.sendMail({
//     from: process.env.EMAIL,
//     to: process.env.EMAIL,
//     subject: "Weekly AI Research Report",
//     text: "Your report is attached.",
//     attachments: [{ path: pdfPath }]
//   });

//   console.log("Email sent ✔");
// }

// module.exports = sendReport;


const nodemailer = require("nodemailer");

// ✅ Create transporter ONCE (important for performance)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ Optional debug (run once at startup)
transporter.verify()
  .then(() => console.log("Email server ready ✔"))
  .catch(err => console.error("Email error:", err));

/**
 * Send report to a specific user
 * @param {string} to - recipient email
 * @param {string} filePath - PDF path
 */
async function sendReport(to, filePath) {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to, 
    subject: "Weekly AI Research Report",
    text: "Your weekly AI report is attached.",
    attachments: [
      {
        path: filePath
      }
    ]
  });

  console.log(`Email sent ✔ to: ${to}`);
}

module.exports = sendReport;