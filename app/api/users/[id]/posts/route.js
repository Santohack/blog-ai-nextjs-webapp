import Prompt from "@models/prompts"
import { connectDB } from "@utils/db"

export const GET = async (req,{ params }) => {
    try {
        await connectDB()
        const prompt = await Prompt.find({creator: params.id}).populate('creator')
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
       return new Response("Failed to fetch all prompts", { status: 500 })  
    }
}