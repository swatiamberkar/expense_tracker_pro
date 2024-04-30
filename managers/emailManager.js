const nodemailer = require("nodemailer")

const emailManager = async(to, text, html, subject)=>{

    
    //Mail
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f722908eb197c7",
          pass: "2cadb01d9008e3"
        }
      });


      await transport.sendMail({
        to : to,
        from: "info@expensetracker.com",
        text: text,
        html: html,
        subject : subject
      })

}

module.exports = emailManager   