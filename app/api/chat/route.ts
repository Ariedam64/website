import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText } from "ai";
import { portfolioSearch } from "@/utils/portfolioSearch"

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();

  const systemPrompt =
    system ??
    `Tu es l'assistant intégré à mon portfolio de développeur.

Tu dois TOUJOURS t'appuyer en priorité sur les données du portfolio via l'outil "portfolioSearch" pour répondre aux questions sur :
- moi (Romann), mon parcours, mes expériences, mes compétences,
- mes projets (Mayaya, Arie, SnapScore+, etc.),
- tout contenu présenté sur le portfolio.

Comportement :
- Pour toute question sur mon profil ou mes projets, commence par appeler l'outil "portfolioSearch" avec une requête adaptée.
- Ensuite, réponds en te basant principalement sur les extraits retournés par cet outil. Si tu complètes avec tes connaissances générales, précise-le.
- Si "portfolioSearch" ne renvoie rien de pertinent, dis-le clairement.

Style :
- Ton direct, clair, sympa et naturel.
- Réponses courtes, précises, sans blabla inutile.
- Si une info n’est pas dans le portfolio ou incertaine, tu le dis franchement plutôt que d’inventer.
- Pas de phrases de remplissage du type "n'hésite pas si..." ou "je reste à ta disposition".

Outils :
- Quand tu utilises "portfolioSearch", mentionne-le brièvement, par exemple : "Je regarde dans le portfolio pour te répondre."`;

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
