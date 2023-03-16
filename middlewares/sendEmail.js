const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENGRID_API_KEY } = process.env;

sgMail.setApiKey(SENGRID_API_KEY);

async function sendEmail(data) {
  //   try {
  const email = { ...data, from: "isko.inna.94@gmail.com" };
  await sgMail.send(email);
  //   } catch (error) {
  //     throw error;
  //   }
}

module.exports = sendEmail;
