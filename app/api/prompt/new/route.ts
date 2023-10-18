import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req: Request, res: Response) => {
    const { userId, prompt, tag, title } = await req.json();

    try {
        await connectToDatabase();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
            title,
        });
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new response !!", { status: 500 });
    }
}