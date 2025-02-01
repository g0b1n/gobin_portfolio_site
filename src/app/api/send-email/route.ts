import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

// Get the SendGrid API key from environment variables
const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (!sendgridApiKey) {
  throw new Error("SENDGRID_API_KEY is not set in the environment variables");
}

// Initialize SendGrid with the API key
sgMail.setApiKey(sendgridApiKey);

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const { firstName, lastName, email, message } = await request.json();

    // Validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 }
      );
    }

    const msg = {
      to: process.env.CONTACT_EMAIL || "gdahal092801@gmail.com",
      from: process.env.SENDER_EMAIL || "gobin.bunney@gmail.com",
      replyTo: email,
      subject: `New message from ${firstName} ${lastName}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h3 style="color: #0066cc;">New Message</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
