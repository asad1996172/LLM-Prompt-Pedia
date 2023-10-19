import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

function filterPrompts(searchText, prompts) {
    // First, filter by username
    let filtered = prompts.filter(prompt => prompt.creator.username.includes(searchText));

    // If no results by username, filter by tag
    if (filtered.length === 0) {
        filtered = prompts.filter(prompt => {
            const tags = prompt.tag.split(',').map(tag => tag.trim());
            return tags.some(tag => tag.includes(searchText));
        });
    }

    // If no results by username or tag, filter by prompt content
    if (filtered.length === 0) {
        filtered = prompts.filter(prompt => prompt.prompt.includes(searchText));
    }

    return filtered;
}

export const GET = async (req, { params }) => {
    try {
        await connectToDatabase();
        
        console.log("SearchText: ", params.searchText);
        const prompts = await Prompt.find({}).populate("creator");
        const filteredPrompts = filterPrompts(params.searchText, prompts);

        return new Response(JSON.stringify(filteredPrompts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompts", { status: 500 });
    }
}