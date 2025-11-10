// scripts/index-portfolio.cjs
const fs = require("fs/promises");
const path = require("path");
const { Pinecone } = require("@pinecone-database/pinecone");
const OpenAI = require("openai").default;
require("dotenv").config();

;(async () => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const pc = new Pinecone();
    const index = pc.index(process.env.PINECONE_INDEX);

    // 1) Purge complète de l'index
    console.log("🧨 Suppression de tous les vecteurs de l'index...");
    await index.deleteAll();
    console.log("✅ Index vidé.");

    // 2) Lecture des fichiers de contenu
    const dir = path.resolve(process.cwd(), "app/data/assistant");
    const files = await fs.readdir(dir);

    for (const file of files) {
      const text = await fs.readFile(path.join(dir, file), "utf-8");

      const chunks = text
        .split("\n\n")
        .map((c) => c.trim())
        .filter((c) => c.length > 50);

      if (!chunks.length) {
        console.log(`⚠️ Aucun chunk suffisant dans ${file}, ignoré.`);
        continue;
      }

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

    console.log("🏁 Indexation du portfolio terminée.");
  } catch (err) {
    console.error("❌ Erreur pendant l'indexation du portfolio :", err);
    process.exit(1);
  }
})();
