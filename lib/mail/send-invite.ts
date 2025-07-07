import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const url = process.env.NEXT_PUBLIC_APP_URL;
const myMail = "Security <no-reply@security.peterlianpi.xyz>";

export const sendInviteEmail = async (email: string, token: string, organizationName: string) => {
    const inviteLink = `${url}/invite/accept?token=${token}`;

    await resend.emails.send({
        from: myMail,
        to: email,
        subject: `Invitation to join ${organizationName}`,
        html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
        <h2 style="text-align: center; color: #4CAF50;">You’ve been invited!</h2>
        <p>Hi,</p>
        <p>You have been invited to join the organization <strong>${organizationName}</strong>.</p>
        <p>Click the button below to accept the invitation and create your account or sign in:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${inviteLink}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Accept Invitation</a>
        </div>
        <p>This link will expire in 7 days. If you did not expect this invitation, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd;" />
        <p style="text-align: center; font-size: 12px; color: #666;">© 2025 Your Company. All rights reserved.</p>
      </div>
    `,
    });
};
