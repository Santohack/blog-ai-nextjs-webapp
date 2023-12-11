import Prompt from "@models/prompts";
import { connectDB } from "@utils/db";


export const POST = async (req) => {
    const { prompt, userId, tag } = await req.json();
    try {
        await connectDB();
        const newPrompt = await Prompt.create({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
        console.log(error);
        
    }
}