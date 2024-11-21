import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const projects = await prisma.project.findMany()
            res.status(200).json(projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
            res.status(500).json({ error: 'Error fetching projects'});
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed"});
    }
}