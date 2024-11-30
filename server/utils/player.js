
const nodemailer = require("nodemailer")
const { MailtrapTransport } =  require("mailtrap")
const ejs = require("ejs")
const fs = require("fs").promises
const { emailError } = require("./customError")
const TOKEN = process.env.LITENOTE_MAILTRAP_EMAIL_TOKEN;
const SENDER_EMAIL = "no-reply@litenote.app";
const sendEmail = async (data)=>{
  let transporter =  nodemailer.createTransport(MailtrapTransport({
    token: TOKEN,
  }))
  try{
    // Configure the mailoptions object
const mailOptions = {
  from: SENDER_EMAIL,
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