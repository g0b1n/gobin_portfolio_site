import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from '@sendgrid/mail';
// import rateLimit from 'next-rate-limit';

// Get the SendGrid API key from environment variables
const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (!sendgridApiKey) {
    throw new Error("SENDGRID_API_KEY is not set in the environment variables");
}

// Initialize SendGrid with the API key
sgMail.setApiKey(sendgridApiKey); // Use `sendgridApiKey` instead of `process.env.SENDGRID_API_KEY`

type Data = {
    message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const { firstName, lastName, email, message } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({ message: `All fields are required.` });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: `Invalid email format.` });
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

        try {
            await sgMail.send(msg);
            return res.status(200).json({ message: `Message sent successfully!` });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `Something went wrong.` });
        }
    } else {
        return res.status(405).json({ message: `Method Not Allowed` });
    }
}


// // limit rate of emails being sent
// const limiter = rateLimit({
//     interval: 60 * 100, // 1 min
//     uniqueTokenPerInterval: 100, // max 100 requests per minute
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     try {
//         await limiter.check(res, 10, "CACHE_TOKEN"); // allow 10 req per min
//         // handler logic
//     } catch {
//         return res.status(429).json({message: "Too many requests. Please try again later."});
//     }
// }