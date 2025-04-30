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
        "link": `${frontendUrl}/verify/${email}/${token}`,
        "company_info_name": "Test_Company_info_name",
        "company_info_address": "Test_Company_info_address",
        "company_info_city": "Test_Company_info_city",
        "company_info_zip_code": "Test_Company_info_zip_code",
        "company_info_country": "Test_Company_info_country"
      }
    });
  } catch (error) {
    console.log(error);
    throw new emailError("Unable To Send You A Confirmation And Welcome Email, Try To Register Again", 400);
  }
};

module.exports = { sendVerificationEmail };
