import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { from_name, from_email, message } = await req.json();

    if (!from_name || !from_email || !message) {
      return NextResponse.json(
        { success: false, message: "সব তথ্য দিন" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: from_email,
      subject: `New Contact From ${from_name}`,
      html: `
        <h2>New Contact Message</h2>

        <p><b>Name:</b> ${from_name}</p>

        <p><b>Email:</b> ${from_email}</p>

        <p><b>Message:</b></p>

        <p>${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Email Sent",
    });
  } catch (err) {
    console.log(err);
    console.error("Mail Error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}