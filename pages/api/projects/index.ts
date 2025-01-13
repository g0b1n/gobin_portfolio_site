import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // getting project
    if (req.method === 'GET') {
        try {
            const projects = await prisma.project.findMany()
            res.status(200).json(projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
            res.status(500).json({ error: 'Error fetching projects'});
        }

        // creating new project
    } else if (req.method === 'POST') {
        try {
            const { id, title, description, liveDemo, githubLink, tags } = req.body;
            const newProject = await prisma.project.create({
                data: {
                    title,
                    description,
                    liveDemo,
                    githubLink,
                    tags,
                }
            })
            res.status(201).json(newProject);
        } catch (error) {
            console.error('Error creating new project:', error);
            res.status(500).json({ error: 'Error creating new project'});
        }

        // updating project
    } else if (req.method === 'PUT') {
        // handle project update
        const { id, title, description, liveDemo, githubLink, tags } = req.body;

        try {
            const updatedProject = await prisma.project.update({
                where: { id: parseInt(id, 10) },
                data: {
                    title,
                    description,
                    liveDemo,
                    githubLink,
                    tags,
                },
            });
            res.status(200).json(updatedProject);
        } catch (error) {
            console.error('Error updating project:', error);
            res.status(500).json({error: 'Error updating project'});
        }

        // deleting project
    } else if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            await prisma.project.delete({
                where: { id },
            })
            res.status(200).json({ message: 'Project deleted successfully'});
        } catch (error) {
            console.error('Error deleting project:', error);
            res.status(500).json({ error: 'Error deleting project'})
        }
    } 
    else {
        res.status(405).json({ message: "Method Not Allowd"})
    }
}