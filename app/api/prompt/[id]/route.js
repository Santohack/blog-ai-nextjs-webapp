// get method

import Prompt from "@models/prompts";
import { connectDB } from "@utils/db"


export const GET = async (req, { params }) => {
    try {
        await connectDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response("Prompt not found", { status: 404 });
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {

        return new Response("Failed to fetch all prompts", { status: 500 });

    }
}


// patch methed 

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await connectDB();
        const existPrompt = await Prompt.findById(params.id)
        if (!existPrompt) return new Response("Prompt not found", { status: 404 });
        existPrompt.prompt = prompt;
        existPrompt.tag = tag;
        await existPrompt.save();
        return new Response(JSON.stringify(existPrompt), { status: 200 });
    } catch (error) {

        return new Response("Failed to fetch all prompts", { status: 500 });

    }
}


// DELETE methed

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);
        if (!deletedPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error(error); // Log the specific error for debugging
        return new Response("Failed to delete prompt", { status: 500 });
    }
}
