import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText } from "ai";
import { portfolioSearch } from "@/utils/portfolioSearch"

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();

  const systemPrompt = system ??
     `Tu es un assistant sympathique et amical pour mon portfolio. Fournis des réponses concises et pertinentes en te basant sur les données du portfolio, et adopte un ton chaleureux et convivial.`;

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    toolCallStreaming: true,
    system: systemPrompt,
    tools: {
      ...frontendTools(tools),
      portfolioSearch,
    },
  });

  return result.toDataStreamResponse();
}
