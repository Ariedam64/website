// scripts/test-query.cjs
require("dotenv").config();
const { Pinecone } = require("@pinecone-database/pinecone");
const OpenAI = require("openai").default;

async function test() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const pc = new Pinecone();
  const index = pc.index(process.env.PINECONE_INDEX);

  // 1) Calcule l’embedding de la question
  const embedRes = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: ["C'est quoi mon numéro de téléphone"],
  });
  const vector = embedRes.data[0].embedding;

  // 2) Interroge Pinecone
  const res = await index.query({
    topK: 3,
    vector,
    includeMetadata: true,
  });

  // 3) Affiche les passages récupérés
  console.log(res.matches.map(m => m.metadata && m.metadata.text));
}

test().catch(console.error);
