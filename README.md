# Aetheria — Digital Memorial Platform

> Let memory live forever in code. A spiritual home for the digital age.

Aetheria is a web app where people can visit memorial profiles, leave tributes, and hold AI-powered conversations with a persona built from a person's life story — powered by Claude and the [immortal-skill](https://github.com/your-repo/immortal-skill) framework.

## Quick Start

```bash
cd aetheria
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Environment Variables

Create a `.env.local` file in the project root:

```bash
ANTHROPIC_API_KEY=your-api-key-here
```

Get your API key at [console.anthropic.com](https://console.anthropic.com). The `.env.local` file is already in `.gitignore` and will never be committed.

## Project Structure

```
aetheria/
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Global layout (Navbar + Footer)
│   │   ├── page.tsx                 # Landing page (hero + features + CTA)
│   │   ├── not-found.tsx            # 404 page
│   │   ├── hall/
│   │   │   └── page.tsx             # Memorial Hall (grid of memorial cards)
│   │   ├── profile/
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Individual memorial page (bio + photos + chat + tribute)
│   │   └── api/
│   │       └── chat/
│   │           └── route.ts         # Streaming chat API route (Anthropic Claude)
│   ├── components/
│   │   ├── Button.tsx               # Reusable button component
│   │   ├── GlassCard.tsx            # Glassmorphism card component
│   │   ├── Navbar.tsx               # Top navigation bar
│   │   ├── Footer.tsx               # Footer
│   │   ├── Starfield.tsx            # Canvas starfield background
│   │   ├── ParticleEffect.tsx       # Tribute flower particle burst
│   │   └── ChatBox.tsx              # Streaming AI chat UI component
│   ├── data/
│   │   ├── memorials.ts             # Memorial data (name, bio, epitaph, photos, etc.)
│   │   └── personas/                # Immortal-skill persona directories
│   │       ├── wei-liang/
│   │       │   ├── SKILL.md         # Persona system prompt + running rules
│   │       │   ├── personality.md   # Core values and thinking style
│   │       │   ├── interaction.md   # Communication style
│   │       │   └── memory.md        # Life experiences and stories
│   │       ├── lin-yue/
│   │       ├── chen-hao/
│   │       ├── su-qing/
│   │       ├── zhang-yi/
│   │       └── wu-xia/
│   └── styles/
│       └── globals.css              # Global styles + noise texture + glassmorphism
├── tailwind.config.ts               # Custom dark theme + animation keyframes
├── .env.local                       # API keys (never committed)
├── package.json
└── README.md
```

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 (App Router) | Framework & routing |
| TypeScript | Type safety |
| Tailwind CSS | Styling system |
| Framer Motion | Animations |
| Lucide React | Icons |
| Anthropic Claude API | AI conversation (claude-haiku-4-5) |
| immortal-skill | Persona framework for AI personas |

## AI Conversation System

Each memorial profile includes a live AI chat powered by Claude. The model speaks as the person, guided by a persona built from the immortal-skill framework.

### How It Works

1. Each memorial has a persona directory under `src/data/personas/{id}/` containing four files:
   - `SKILL.md` — running rules, ethical notes, and persona frame
   - `personality.md` — core values, beliefs, characteristic phrases
   - `interaction.md` — communication style, tone, response patterns
   - `memory.md` — life experiences, career highlights, personal details

2. When a user sends a message on a profile page, the frontend calls `POST /api/chat` with the memorial ID and conversation history.

3. The API route reads the persona files, assembles them into a system prompt, and streams a response from Claude back to the browser.

### Adding a Real Persona

Run the full [immortal-skill](https://github.com/your-repo/immortal-skill) pipeline to generate a persona from real data (chats, emails, social archives). The pipeline produces exactly the directory structure above. Drop the generated folder into `src/data/personas/` and the chat feature picks it up automatically — no code changes needed.

### Adding a New Memorial

1. Add an entry to `src/data/memorials.ts`
2. Create a persona directory at `src/data/personas/{your-id}/` with the four persona files
3. The memorial card appears in the Hall and the profile page is live at `/profile/{your-id}`

## Design Features

- **Starfield background** — Canvas-rendered stars with breathing flicker effect
- **Glassmorphism cards** — Frosted glass style with hover glow
- **Noise texture overlay** — SVG noise layer for a lo-fi, atmospheric feel
- **Tribute particle effect** — Click to trigger a light-burst animation
- **Dark colour system** — Full `aether-*` palette (glow, ember, petal, ghost, whisper…)
- **Streaming chat** — Responses appear word by word, just like a real conversation

## License

MIT
