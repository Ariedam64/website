// tools/portfolioSearch.ts
import { tool } from "ai";
import { z } from "zod";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const pc = new Pinecone();
const index = pc.index(process.env.PINECONE_INDEX!);

export const portfolioSearch = tool({
  description: "Renvoie des extraits pertinents de mon portfolio pour une requête.",
  parameters: z.object({
    query: z.string().describe("La question de l’utilisateur à chercher dans le portfolio"),
  }),
  execute: async ({ query }) => {
    // 1) Embedding
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { data } = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: [query],
    });
    const vector = data[0].embedding;

    // 2) Recherche dans Pinecone
    const res = await index.query({
      topK: 3,
      vector,
      includeMetadata: true,
    });

    // 3) Retourne les textes
    return res.matches.map(m => m.metadata?.text).join("\n\n");
  },
});
