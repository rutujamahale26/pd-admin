import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve("./templates"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./templates"),
  extName: ".hbs",
};

transporter.use("compile", hbs(handlebarOptions));

export default transporter;
