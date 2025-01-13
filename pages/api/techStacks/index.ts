import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const techStacks = await prisma.techStack.findMany()
            res.status(200).json(techStacks);
        } catch (error) {
            console.error('Error fetching techStacks:', error);
            res.status(500).json({ error: 'Error fetching techStacks'});
        }
    } else if (req.method === 'POST') {
        try {
            const { name, image } = req.body;
            const newTechStack = await prisma.techStack.create({
                data: { name, image },
            });

            res.status(201).json(newTechStack);
        } catch (error) {
            console.error('Error creating new techStacks:', error);
            res.status(500).json({ error: 'Error creating new techStacks'});
        }
    } else if (req.method === 'PUT') {
        try {
            const { id, name, image } = req.body;
            const updatedTechStack = await prisma.techStack.update({
                where: { id },
                data: { name, image },
            })

            res.status(200).json(updatedTechStack);
        } catch (error) {
             console.error('Error updating techStacks:', error);
            res.status(500).json({ error: 'Error updating techStacks'});
        }
    } else if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            await prisma.techStack.delete({
                where: { id },
            })

            res.status(200).json({ message: 'TechStack deleted sucessfully'});
        } catch (error) {
            console.error('Error deleting techStack:', error);
            res.status(500).json({ error: 'Error deleting techStack'})
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed"})
    }
}