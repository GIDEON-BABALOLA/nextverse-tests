const { MailtrapClient } = require("mailtrap");
const { emailError } = require("./customError");
const TOKEN = process.env.LITENOTE_MAILTRAP_EMAIL_TOKEN;
const SENDER_EMAIL = "confirmation@litenote.app";
const sendVerificationEmail = async (email, otp, frontendUrl, token, uuid, time) => {
  const client = new MailtrapClient({ token: TOKEN });

  const sender = {
    email: SENDER_EMAIL,
    name: "Litenote",
  };

  try {
    await client.send({
      from: sender,
      to: [{ email }],
      template_uuid: uuid,
      template_variables: {
        "otp": otp,
        "time": time,
        "email" : email,
        "link": `${frontendUrl}/verify/${email}/${token}`,
        "company_info_name": "NextVerse",
        "company_info_address": "12 Amaforitshe Street, Eboh Road Warri Delta State",
        "company_info_city": "Warri",
        "company_info_zip_code": "332211",
        "company_info_country": "Nigeria"
      }
    });
  } catch (error) {
    console.log(error);
    throw new emailError("Unable To Send You A Confirmation Email, Try To Register Again", 400);
  }
};
const sendWelcomeEmail = async (email, name, uuid) => {
  const client = new MailtrapClient({ token: TOKEN });

  const sender = {
    email: SENDER_EMAIL,
    name: "Litenote",
  };

  try {
    await client.send({
      from: sender,
      to: [{ email }],
      template_uuid: uuid,
      template_variables: {
        "name" : name,
        "company_info_name": "NextVerse",
        "company_info_address": "12 Amaforitshe Street, Eboh Road Warri Delta State",
        "company_info_city": "Warri",
        "company_info_zip_code": "332211",
        "company_info_country": "Nigeria"
      }
    });
  } catch (error) {
    console.log(error);
    throw new emailError("Unable To Send You A Welcome Email", 400);
  }
};
const sendReportEmail = async (email, name, reportedUser, category, uuid) => {
  const client = new MailtrapClient({ token: TOKEN });

  const sender = {
    email: SENDER_EMAIL,
    name: "Litenote",
  };

  try {
    await client.send({
      from: sender,
      to: [{ email }],
      template_uuid: uuid,
      template_variables: {
        "name" : name,
        "reportedUser" : reportedUser,
        "category" : category,
        "company_info_name": "NextVerse",
        "company_info_address": "12 Amaforitshe Street, Eboh Road Warri Delta State",
        "company_info_city": "Warri",
        "company_info_zip_code": "332211",
        "company_info_country": "Nigeria"
      }
    });
  } catch (error) {
    console.log(error);
    throw new emailError("Unable To Send You A Welcome Email", 400);
  }
};

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendReportEmail };
