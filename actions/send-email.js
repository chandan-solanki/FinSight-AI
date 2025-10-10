"use server"
import { Resend } from "resend";


export async function sendEmail({ to, subject, react }) {
    console.log("email sends...........................", to)
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "Finsight AI <onboarding@resend.dev>",
      to,
      subject,
      react,
    });

    console.log({error});

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email :", error);
    return { success: false, error };
  }
}
