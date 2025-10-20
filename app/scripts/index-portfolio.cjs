// scripts/index-portfolio.cjs
const fs = require("fs/promises");
const path = require("path");
const { Pinecone } = require("@pinecone-database/pinecone");
const OpenAI = require("openai").default;
require("dotenv").config();

;(async () => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const pc = new Pinecone();  
  const index = pc.index(process.env.PINECONE_INDEX);

  const dir = path.resolve(process.cwd(), "app/data/assistant");
  const files = await fs.readdir(dir);

  for (const file of files) {
    const text = await fs.readFile(path.join(dir, file), "utf-8");
    const chunks = text
      .split("\n\n")
      .map((c) => c.trim())
      .filter((c) => c.length > 50);

    const embedRes = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunks,
    });

    const vectors = embedRes.data.map((e, i) => ({
      id: `${file}::${i}`,
      values: e.embedding,
      metadata: { text: chunks[i] },
    }));

    await index.upsert(vectors);
    console.log(`✅ Indexé ${vectors.length} chunks de ${file}`);
  }
})();
