import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function loadPersonaSystem(memorialId: string): string {
  const base = join(process.cwd(), "src/data/personas", memorialId);

  const read = (file: string) => {
    const p = join(base, file);
    return existsSync(p) ? readFileSync(p, "utf-8") : "";
  };

  const skill = read("SKILL.md");
  const personality = read("personality.md");
  const interaction = read("interaction.md");
  const memory = read("memory.md");

  if (!skill) {
    return `You are a digital memorial persona. Be respectful, warm, and thoughtful.`;
  }

  return [
    "# PERSONA SKILL\n" + skill,
    personality ? "## personality.md\n" + personality : "",
    interaction ? "## interaction.md\n" + interaction : "",
    memory ? "## memory.md\n" + memory : "",
    "\n---\nYou are now inhabiting this persona. Speak in the first person as this individual. Be authentic to their documented character, values, and communication style.",
  ]
    .filter(Boolean)
    .join("\n\n");
}

export async function POST(req: Request) {
  try {
    const { memorialId, messages } = await req.json();

    if (!memorialId || !messages) {
      return new Response("Missing memorialId or messages", { status: 400 });
    }

    const systemPrompt = loadPersonaSystem(memorialId);

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const anthropicStream = await client.messages.stream({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 1024,
            system: systemPrompt,
            messages,
          });

          for await (const chunk of anthropicStream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
