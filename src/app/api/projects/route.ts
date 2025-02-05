import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: fetch all projects
export async function GET() {
    try {
        const projects = await prisma.project.findMany();
        return NextResponse.json(projects, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch projects"}, { status: 500 });
    }
}

// POST: create new projects
export async function POST(req: Request) {
    try {
        const { title, description, liveDemo, githubLink, tags} = await req.json();

        if (!title || !description) {
            return NextResponse.json({ error: "Title and description are required"}, { status: 400 });
        }

        const newProject = await prisma.project.create({
            data: {
                title,
                description,
                liveDemo,
                githubLink,
                tags: tags || [],
            },
        });

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}

// PUT: update an existing project
export async function PUT(req: Request) {
    try {
        const { id, title, description, liveDemo, githubLink, tags } = await req.json();

        if (!id || !title || !description) {
            return NextResponse.json({ error: "ID, Title, and Description are required" }, { status: 400 });
        }

        const updatedProject = await prisma.project.update({
            where: { id },
            data: {
                title,
                description,
                liveDemo,
                githubLink,
                tags: tags || [],
            },
        });

        return NextResponse.json(updatedProject, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

// DELETE: delete/remove a project
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
        }

        await prisma.project.delete({ where: { id } });

        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}