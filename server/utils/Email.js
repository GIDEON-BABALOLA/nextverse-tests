const nodemailer = require("nodemailer")
const ejs = require("ejs")
const fs = require("fs").promises
const { emailError } = require("./customError")
const sendEmail = async (data)=>{
  let transporter = nodemailer.createTransport({
    host: process.env.ELASTICE_EMAIL_SERVER,
    port: process.env.ELASTICE_EMAIL_PORT,
    secure: false, //for now, when deploying make secure true
    auth: {
      user: process.env.ELASTICE_EMAIL_USERNAME,
      pass: process.env.ELASTICE_EMAIL_PASSWORD,
    }
  });
  try{
    // Configure the mailoptions object
const mailOptions = {
  from: 'nextverse.101@gmail.com',
  to: data.to,
  subject: data.subject,
  text: data.text,
  html : data.html
};
 await transporter.sendMail(mailOptions);
  }catch(error){
    console.log(error)
throw new emailError("Unable To Send You A Confirmation And Welcome Email, Try To Register Again", 400)
  }
      

}
const generateEmailContent = async (values, path) => {
  try {
      const templatePath = path
      const template = await fs.readFile(templatePath, 'utf-8');
      const compiledTemplate = ejs.compile(template);
      const htmlContent = compiledTemplate(values);
      return htmlContent;
  } catch (error) {
    console.log(error)
    console.error('Error reading or compiling the template:', error);
    throw new emailError("Unable To Generate The Signup And Welcome Email For You", 400)
  }
};
module.exports = { sendEmail, generateEmailContent }