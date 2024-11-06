// import type { NextApiRequest, NextApiResponse } from "next";
// import sgMail from '@sendgrid/mail';

// // // set sendgrid API key from env variables
// // const sendgridApiKey = process.env.SENDGRID_API_KEY;

// // if (!sendgridApiKey) {
// //     throw new Error("SENDGRID_API_KEY is not set in the environment variables");
// // }

// // init sendgrid with api key
// // console.log("SendGrid API Key: ", process.env.SENDGRID_API_KEY);
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// type Data = {
//     message: string;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
//     if (req.method === 'POST') {
//         const { firstName, lastName, email, message } = req.body;

//         // validation
//         if (!firstName || !lastName || !email || !message) {
//             return res.status(400).json({ message: `All fields are required.`});
//         }

//         const msg = {
//             to: 'gdahal092801@gmail.com', // change this later. have email in another file and import it here
//             from: 'gobin.bunney@gmail.com', // change this later. have email in another file and import it here
//             replyTo: email, // this will be the users email from the contact form
//             subject: `New message from ${firstName} ${lastName}`,
//             text: message,
//             html: `
//                 <h3>New message from ${firstName} ${lastName} ${email}</h3>
//                 <p>${message}</p>
//             `
//         };

//         try {
//             // send email using sendgrid
//             await sgMail.send(msg);
//             return res.status(200).json({ message: `Message sent successfully!` });
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json({ message: `Something went wrong.` });
//         }
//     } else {
//         return res.status(405).json({ message: `Method Not Allowed` });
//     }
// }