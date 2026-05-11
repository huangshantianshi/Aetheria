export interface Memorial {
  id: string;
  name: string;
  birthYear: number;
  deathYear: number;
  epitaph: string;
  avatar: string;
  bio: string;
  photos: string[];
  tributes: number;
}

export const memorials: Memorial[] = [
  {
    id: "wei-liang",
    name: "Wei Liang",
    birthYear: 1945,
    deathYear: 2024,
    epitaph: "In the name of code, I built a bridge to eternity",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=WeiLiang&backgroundColor=1a1a2e",
    bio: `Wei Liang was a pioneering computer scientist who devoted his life to bridging artificial intelligence and the humanities. He firmly believed that technology could allow human memory to transcend the boundaries of time. Over a career spanning more than four decades, he published over two hundred groundbreaking papers and mentored countless young scientists. He often said: "Code is another form of poetry, and algorithms are the stairway to eternity."`,
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=300&fit=crop",
    ],
    tributes: 342,
  },
  {
    id: "lin-yue",
    name: "Lin Yue",
    birthYear: 1968,
    deathYear: 2023,
    epitaph: "Her smile was the warmest star in the night sky",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=LinYue&backgroundColor=1a1a2e",
    bio: `Lin Yue was a distinguished astronomer and science communicator. She explained the mysteries of the cosmos to the public in language both accessible and poetic, earning the title "Translator of the Stars." Her popular science programme, Gaze Upward, inspired a generation to fall in love with the night sky. Even in her final days, she continued writing her reflections on the universe from her hospital bed.`,
    photos: [
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=300&h=300&fit=crop",
    ],
    tributes: 589,
  },
  {
    id: "chen-hao",
    name: "Chen Hao",
    birthYear: 1932,
    deathYear: 2021,
    epitaph: "Leaves return to roots — all things find their way home",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=ChenHao&backgroundColor=1a1a2e",
    bio: `Chen Hao was a world-renowned landscape architect who perfectly fused the classical Chinese philosophy of mountains and water with modern garden design. His Clouds & Water series of gardens can be found across the globe, each one embodying a deep reverence for nature and a meditation on the cycle of life. His guiding principle was: "A garden is not humanity's conquest of nature, but a conversation with it."`,
    photos: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300&h=300&fit=crop",
    ],
    tributes: 276,
  },
  {
    id: "su-qing",
    name: "Su Qing",
    birthYear: 1990,
    deathYear: 2025,
    epitaph: "A soul woven from sound — never to dissolve",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=SuQing&backgroundColor=1a1a2e",
    bio: `Su Qing was a brilliantly talented electronic music producer and sound artist. She pioneered a new genre — dubbed "Digital Ink" — by blending samples of traditional Chinese instruments with cyberpunk soundscapes. Her work Bitstream Landscape won international electronic music awards and was described by critics as "an Eastern dreamscape painted in sound waves."`,
    photos: [
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    ],
    tributes: 1024,
  },
  {
    id: "zhang-yi",
    name: "Zhang Yi",
    birthYear: 1955,
    deathYear: 2022,
    epitaph: "Every line of code is a letter written to the future",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=ZhangYi&backgroundColor=1a1a2e",
    bio: `Zhang Yi was one of the key figures in the early development of China's internet. He helped build the country's first email systems, and spent the following two decades working to make digital education accessible to all. His Spark Initiative brought the first computers and first coding lessons to children in remote regions across the country.`,
    photos: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=300&h=300&fit=crop",
    ],
    tributes: 456,
  },
  {
    id: "wu-xia",
    name: "Wu Xia",
    birthYear: 1978,
    deathYear: 2024,
    epitaph: "Words are the softest weapon, and the longest embrace",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=WuXia&backgroundColor=1a1a2e",
    bio: `Wu Xia was a beloved author and poet. Her work used delicate prose to illuminate the everyday lives of ordinary people, finding poetry in the mundane. Her novel The Long River won multiple literary awards and was translated into twelve languages. Through her words, she lit a lantern for countless lost souls.`,
    photos: [
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop",
    ],
    tributes: 712,
  },
];
