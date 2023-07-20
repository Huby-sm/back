import { transporter } from "../index.js";

const sendEmail = (mail) => transporter.sendMail(mail);

export default sendEmail;
