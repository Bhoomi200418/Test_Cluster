
import * as nodeMailer from "nodemailer";
import * as dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();
export class NodeMailer {
  private static initiateTransport() {
    return nodeMailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }
  static async sendMail(data: {
    to: string[];
    subject: string;
    html: string;
  }): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: data.to.join(", "), // join array of recipients into a string
      subject: data.subject,
      html: data.html,
    };
    try {
      const transport = NodeMailer.initiateTransport();
      await transport.sendMail(mailOptions);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}









