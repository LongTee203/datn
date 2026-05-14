import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendResetEmail(to: string, resetUrl: string) {
  const mailOptions = {
    from: `"Pet Care Shop" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Yêu cầu khôi phục mật khẩu - Pet Care Shop",
    html: `
      <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #29664c; text-align: center;">Khôi Phục Mật Khẩu</h2>
        <p>Xin chào,</p>
        <p>Bạn nhận được email này vì bạn (hoặc ai đó) đã yêu cầu khôi phục mật khẩu cho tài khoản tại Pet Care Shop.</p>
        <p>Vui lòng click vào nút bên dưới để tiến hành đổi mật khẩu mới. Đường link này chỉ có hiệu lực trong vòng <strong>15 phút</strong>.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #29664c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Đổi Mật Khẩu Ngay</a>
        </div>
        <p>Nếu bạn không yêu cầu khôi phục mật khẩu, xin hãy bỏ qua email này và mật khẩu của bạn sẽ được giữ nguyên an toàn.</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #888; text-align: center;">© 2024 Pet Care Shop. All rights reserved.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
