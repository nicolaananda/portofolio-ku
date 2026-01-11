import OpenAI from "openai";

// Configure OpenAI client
const openai = new OpenAI({
    apiKey: process.env.API_KEY,
    baseURL: process.env.BASE_URL_API
});

export const aiService = {
    /**
     * Generate a concise summary for a portfolio project from its HTML description
     */
    async generateSummary(htmlContent: string): Promise<string> {
        try {
            // Simply strip HTML tags for now to get raw text
            // In a real app we might use 'cheerio' or similar if structure matters, 
            // but for summarization raw text usually suffices.
            const rawText = htmlContent.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();

            // Limit input size to prevent massive token usage
            const truncatedText = rawText.slice(0, 3000);

            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert copywriter for a developer portfolio. Summarize the following project description into 2-3 concise, professional sentences highlighting the core problem, solution, and tech stack. Do not use markdown styling."
                    },
                    {
                        role: "user",
                        content: truncatedText
                    }
                ],
                max_tokens: 150,
                temperature: 0.7,
            });

            return completion.choices[0].message.content || "";
        } catch (error) {
            console.error("AI Generation Error:", error);
            // Fallback: return empty string so we don't crash, 
            // frontend will just hide the summary or backend can try again later.
            return "";
        }
    }
};
