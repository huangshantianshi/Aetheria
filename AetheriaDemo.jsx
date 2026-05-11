import { useState, useEffect, useRef, useCallback } from "react";

/* ── Memorial data ── */
const memorials = [
  { id: "wei-liang", name: "魏 良", birthYear: 1945, deathYear: 2024, epitaph: "以代码之名，铸永恒之桥", avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=WeiLiang&backgroundColor=1a1a2e", bio: "魏良先生是一位先驱性的计算机科学家，毕生致力于人工智能与人文精神的融合研究。他坚信技术可以让人类的记忆跨越时间的边界。在其四十余年的学术生涯中，他发表了超过两百篇开创性论文。他常说：\u201c代码是另一种诗歌，算法是通往永恒的阶梯。\u201d", photos: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=300&fit=crop"], tributes: 342 },
  { id: "lin-yue", name: "林 月", birthYear: 1968, deathYear: 2023, epitaph: "她的微笑，是夜空中最温暖的星", avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=LinYue&backgroundColor=1a1a2e", bio: "林月女士是一位杰出的天文学家与科学传播者。她用通俗而诗意的语言向公众解释宇宙的奥秘，被誉为\u201c星空的翻译者\u201d。她主持的科普节目《仰望》影响了一代人对星空的热爱。即使在生命的最后时光，她依然在病房中写下对宇宙的思考。", photos: ["https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=300&h=300&fit=crop"], tributes: 589 },
  { id: "chen-hao", name: "陈 浩", birthYear: 1932, deathYear: 2021, epitaph: "落叶归根，万物皆有归处", avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=ChenHao&backgroundColor=1a1a2e", bio: "陈浩先生是一位享誉世界的园林设计师，将中国传统山水哲学与现代景观设计完美融合。他设计的\u201c云水间\u201d系列园林遍布世界各地，每一处都蕴含着对自然的敬畏与对生命循环的思考。", photos: ["https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=300&h=300&fit=crop"], tributes: 276 },
  { id: "su-qing", name: "苏 晴", birthYear: 1990, deathYear: 2025, epitaph: "用音符编织的灵魂，永不消散", avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=SuQing&backgroundColor=1a1a2e", bio: "苏晴是一位才华横溢的电子音乐制作人与声音艺术家。她开创性地将中国传统乐器采样与赛博朋克音景融合，创造了被称为\u201c数字水墨\u201d的全新音乐流派。她的作品《位元山水》获得了国际电子音乐大奖。", photos: ["https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"], tributes: 1024 },
  { id: "zhang-yi", name: "张 毅", birthYear: 1955, deathYear: 2022, epitaph: "每一行代码都是一封写给未来的信", avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=ZhangYi&backgroundColor=1a1a2e", bio: "张毅先生是中国互联网早期发展的重要推动者之一。他参与了国内第一批电子邮件系统的构建，并在后续二十年间致力于推动数字化教育的普及。他创办的\u201c星火计划\u201d为偏远地区的孩子带去了第一台电脑和第一堂编程课。", photos: ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=300&h=300&fit=crop"], tributes: 456 },
  { id: "wu-xia", name: "吴 霞", birthYear: 1978, deathYear: 2024, epitaph: "文字是最柔软的武器，也是最持久的拥抱", avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=WuXia&backgroundColor=1a1a2e", bio: "吴霞是一位深受读者喜爱的作家与诗人。她的作品以细腻的笔触描绘普通人的日常生活，在平凡中发现诗意。她的长篇小说《长河》获得了多项文学大奖，被翻译成十二种语言。", photos: ["https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop","https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop"], tributes: 712 },
];

/* ── Starfield Canvas ── */
function Starfield() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let stars = [];
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      const count = Math.floor((canvas.width * canvas.height) / 5000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        s: Math.random() * 1.5 + 0.5, o: Math.random() * 0.5 + 0.2,
        sp: Math.random() * 0.15 + 0.02, ph: Math.random() * Math.PI * 2,
      }));
    };
    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const st of stars) {
        const tw = Math.sin(t * 0.001 * st.sp + st.ph) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,181,253,${st.o * tw})`;
        ctx.fill();
        if (st.s > 1.2) {
          ctx.beginPath();
          ctx.arc(st.x, st.y, st.s * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99,102,241,${st.o * tw * 0.08})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />;
}

/* ── Particle Burst ── */
function useParticles() {
  const [particles, setParticles] = useState([]);
  const burst = useCallback((x, y) => {
    const colors = ["#f0abfc", "#c4b5fd", "#a78bfa", "#fbbf24", "#6366f1"];
    const pts = Array.from({ length: 20 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 20 + (Math.random() - 0.5) * 0.5;
      const dist = Math.random() * 100 + 50;
      return {
        id: Date.now() + i, x, y, color: colors[i % colors.length],
        size: Math.random() * 5 + 3,
        tx: Math.cos(angle) * dist, ty: Math.sin(angle) * dist - 30,
        dur: Math.random() * 1 + 0.7,
      };
    });
    setParticles(pts);
    setTimeout(() => setParticles([]), 2000);
  }, []);
  return { particles, burst };
}

function Particles({ particles }) {
  return (
    <>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "fixed", left: p.x, top: p.y, width: p.size, height: p.size,
          borderRadius: "50%", background: p.color, pointerEvents: "none", zIndex: 9000,
          boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          animation: `particleFly ${p.dur}s ease-out forwards`,
          "--ptx": `${p.tx}px`, "--pty": `${p.ty}px`,
        }} />
      ))}
    </>
  );
}

/* ── Shared Components ── */
const GlassCard = ({ children, className = "", onClick, style }) => (
  <div onClick={onClick} className={className} style={{
    background: "rgba(20,20,34,0.6)", backdropFilter: "blur(16px)",
    border: "1px solid rgba(99,102,241,0.12)", borderRadius: 16, padding: 24,
    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)", cursor: onClick ? "pointer" : "default", ...style,
  }}
    onMouseEnter={e => { if (onClick) { e.currentTarget.style.background = "rgba(26,26,46,0.75)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(99,102,241,0.08)"; e.currentTarget.style.transform = "translateY(-4px)"; }}}
    onMouseLeave={e => { e.currentTarget.style.background = "rgba(20,20,34,0.6)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.12)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
  >
    {children}
  </div>
);

const Btn = ({ children, variant = "primary", onClick, disabled, style: extraStyle }) => {
  const styles = {
    primary: { background: "rgba(99,102,241,0.2)", borderColor: "rgba(99,102,241,0.4)", color: "#c4b5fd" },
    ghost: { background: "transparent", borderColor: "rgba(42,42,74,0.4)", color: "#9898b8" },
    tribute: { background: "rgba(240,171,252,0.15)", borderColor: "rgba(240,171,252,0.3)", color: "#f0abfc" },
  };
  const s = styles[variant];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      padding: "10px 24px", borderRadius: 12, fontWeight: 500, fontSize: 14,
      border: `1px solid ${s.borderColor}`, background: s.background, color: s.color,
      cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.3s",
      opacity: disabled ? 0.5 : 1, fontFamily: "inherit", ...extraStyle,
    }}>
      {children}
    </button>
  );
};

/* ── Landing Page ── */
function LandingPage({ onNavigate }) {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Starfield />
      {/* Hero */}
      <div style={{ minHeight: "88vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px 0", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 350, background: "rgba(99,102,241,0.06)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
          <p style={{ fontFamily: "monospace", fontSize: 12, color: "#a78bfa", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 24 }}>
            赛博永生 &middot; 数字记忆宫殿
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "clamp(36px,7vw,64px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 20, color: "#e0e0ff" }}>
            Aetheria<br />
            <span style={{ background: "linear-gradient(to right,#6366f1,#a78bfa,#f0abfc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              让记忆在位元中永生
            </span>
          </h1>
          <p style={{ color: "#9898b8", fontSize: "clamp(15px,2.2vw,19px)", lineHeight: 1.7, marginBottom: 36 }}>
            解决物理土地稀缺，构建数字时代的精神家园。<br />
            <span style={{ opacity: 0.6 }}>每一段记忆，都值得被永恒守护。</span>
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn variant="primary" onClick={() => onNavigate("hall")}>进入纪念堂 &rarr;</Btn>
            <Btn variant="ghost">了解更多</Btn>
          </div>
        </div>
      </div>
      {/* Features */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 28, fontWeight: 600, color: "#e0e0ff", marginBottom: 12 }}>重新定义纪念</h2>
          <p style={{ color: "#9898b8", maxWidth: 420, margin: "0 auto" }}>在数字的永恒中，为每一个灵魂建造一座不朽的殿堂</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {[
            { icon: "✨", title: "AI 生命叙述", desc: "通过人工智能技术，将碎片化的记忆编织成完整而动人的生命故事。", c: "rgba(99,102,241,0.15)" },
            { icon: "🌍", title: "数字遗产空间", desc: "照片、文字、声音——所有珍贵的数字遗产，在虚拟空间中永久保存。", c: "rgba(167,139,250,0.15)" },
            { icon: "🛡", title: "永恒的守护", desc: "基于区块链技术确保数据永不丢失，分布式存储保障每一份记忆。", c: "rgba(240,171,252,0.15)" },
          ].map((f, i) => (
            <GlassCard key={i}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: f.c, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, fontSize: 18 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 17, fontWeight: 500, color: "#e0e0ff", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: "#9898b8", fontSize: 13, lineHeight: 1.7 }}>{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
      {/* CTA */}
      <div style={{ textAlign: "center", padding: "48px 24px 80px", position: "relative", zIndex: 2 }}>
        <p style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(152,152,184,0.5)", letterSpacing: "0.2em", marginBottom: 14 }}>
          — 在位元的海洋中，没有真正的告别 —
        </p>
        <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 24, color: "#e0e0ff", marginBottom: 28 }}>
          每一缕思念，都是通往永恒的光
        </h2>
        <Btn variant="primary" onClick={() => onNavigate("hall")}>✨ 开始探索</Btn>
      </div>
    </div>
  );
}

/* ── Hall Page ── */
function HallPage({ onNavigate }) {
  return (
    <div style={{ minHeight: "100vh", position: "relative", padding: "100px 24px 80px" }}>
      <Starfield />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, border: "1px solid rgba(42,42,74,0.3)", background: "rgba(26,26,46,0.3)", fontSize: 12, fontFamily: "monospace", color: "#9898b8", marginBottom: 20 }}>
            <span style={{ color: "#fbbf24" }}>🕯</span> {memorials.length} 位灵魂在此安息
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: "clamp(28px,5vw,42px)", fontWeight: 700, color: "#e0e0ff", marginBottom: 12 }}>虚拟纪念堂</h1>
          <p style={{ color: "#9898b8", maxWidth: 400, margin: "0 auto" }}>每一张卡片都是一扇通往记忆的门。轻触，便能与过去重逢。</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
          {memorials.map((m) => (
            <GlassCard key={m.id} onClick={() => onNavigate("profile", m.id)}>
              <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(42,42,74,0.3)" }}>
                    <img src={m.avatar} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ position: "absolute", bottom: -1, right: -1, width: 13, height: 13, borderRadius: "50%", background: "rgba(99,102,241,0.6)", border: "2px solid #0f0f1a", animation: "glowPulse 3s ease-in-out infinite" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 17, fontWeight: 600, color: "#e0e0ff" }}>{m.name}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "rgba(152,152,184,0.6)", display: "flex", alignItems: "center", gap: 5 }}>🕐 {m.birthYear} — {m.deathYear}</div>
                </div>
              </div>
              <p style={{ color: "#9898b8", fontSize: 13, lineHeight: 1.6, fontStyle: "italic", marginBottom: 14 }}>
                &ldquo;{m.epitaph}&rdquo;
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid rgba(42,42,74,0.15)" }}>
                <span style={{ fontSize: 12, color: "rgba(240,171,252,0.6)" }}>♥ {m.tributes} 次追思</span>
                <span style={{ fontSize: 12, fontFamily: "monospace", color: "rgba(99,102,241,0.6)" }}>探访 →</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Profile Page ── */
function ProfilePage({ memorialId, onNavigate }) {
  const m = memorials.find((x) => x.id === memorialId);
  const [extraTributes, setExtraTributes] = useState(0);
  const { particles, burst } = useParticles();
  const btnRef = useRef(null);

  if (!m) return <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#9898b8" }}>未找到此纪念页</div>;

  const handleTribute = () => {
    setExtraTributes((c) => c + 1);
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2);
    }
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", padding: "100px 24px 80px" }}>
      <Starfield />
      <Particles particles={particles} />
      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 28 }}>
          <Btn variant="ghost" onClick={() => onNavigate("hall")} style={{ fontSize: 13, padding: "6px 14px" }}>← 返回纪念堂</Btn>
        </div>

        {/* Header card */}
        <GlassCard style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 28, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: 110, height: 110, borderRadius: 16, overflow: "hidden", border: "2px solid rgba(42,42,74,0.3)" }}>
                <img src={m.avatar} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", inset: -8, background: "rgba(99,102,241,0.05)", borderRadius: 24, filter: "blur(12px)", zIndex: -1 }} />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h1 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 30, fontWeight: 700, color: "#e0e0ff", marginBottom: 8 }}>{m.name}</h1>
              <div style={{ display: "flex", gap: 16, marginBottom: 12, fontSize: 13, flexWrap: "wrap" }}>
                <span style={{ color: "rgba(152,152,184,0.7)", fontFamily: "monospace" }}>📅 {m.birthYear} — {m.deathYear}</span>
                <span style={{ color: "rgba(240,171,252,0.6)" }}>♥ {m.tributes + extraTributes} 次追思</span>
              </div>
              <p style={{ color: "#a78bfa", fontStyle: "italic", fontSize: 15 }}>&ldquo;{m.epitaph}&rdquo;</p>
            </div>
          </div>
        </GlassCard>

        {/* Content grid */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Bio */}
            <GlassCard>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span>📖</span>
                <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 17, fontWeight: 500, color: "#e0e0ff", margin: 0 }}>生平介绍</h2>
                <span style={{ marginLeft: "auto", fontSize: 11, fontFamily: "monospace", color: "rgba(152,152,184,0.4)" }}>AI 生成</span>
              </div>
              <p style={{ color: "#9898b8", fontSize: 13, lineHeight: 1.8, margin: 0 }}>{m.bio}</p>
            </GlassCard>
            {/* Photos */}
            <GlassCard>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span>🖼</span>
                <h2 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 17, fontWeight: 500, color: "#e0e0ff", margin: 0 }}>数字遗产</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {m.photos.map((p, i) => (
                  <div key={i} style={{ aspectRatio: "1", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(42,42,74,0.2)" }}>
                    <img src={p} alt={`遗产 ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Tribute */}
            <GlassCard>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12, animation: "flicker 4s ease-in-out infinite" }}>🕯</div>
                <p style={{ color: "#9898b8", fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>点一盏灯，献一束花<br />让思念跨越虚空</p>
                <button ref={btnRef} onClick={handleTribute} style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "10px 20px", borderRadius: 12, fontWeight: 500, fontSize: 14, fontFamily: "inherit",
                  background: "rgba(240,171,252,0.15)", border: "1px solid rgba(240,171,252,0.3)", color: "#f0abfc",
                  cursor: "pointer", transition: "all 0.3s",
                }}>🌸 献花追思</button>
                {extraTributes > 0 && (
                  <p style={{ fontSize: 12, fontFamily: "monospace", color: "rgba(240,171,252,0.6)", marginTop: 12 }}>
                    您已献花 {extraTributes} 次
                  </p>
                )}
              </div>
            </GlassCard>
            {/* AI Chat placeholder */}
            <GlassCard>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, color: "rgba(99,102,241,0.6)", marginBottom: 10 }}>💬</div>
                <h3 style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontSize: 14, fontWeight: 500, color: "#e0e0ff", marginBottom: 8 }}>AI 对话</h3>
                <p style={{ color: "rgba(152,152,184,0.5)", fontSize: 11, lineHeight: 1.6, marginBottom: 14 }}>即将上线：与 AI 构建的记忆对话，重温 Ta 的智慧与温暖。</p>
                <Btn variant="ghost" disabled style={{ width: "100%" }}>敬请期待</Btn>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Navbar ── */
function Navbar({ onNavigate }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(10,10,15,0.8)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(42,42,74,0.2)", height: 56,
      display: "flex", alignItems: "center", padding: "0 20px",
    }}>
      <div onClick={() => onNavigate("landing")} style={{ fontFamily: "'Space Grotesk',system-ui,sans-serif", fontWeight: 600, fontSize: 17, color: "#e0e0ff", cursor: "pointer", letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#6366f1" }}>🔥</span> Aetheria
      </div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
        <button onClick={() => onNavigate("landing")} style={{ background: "none", border: "none", color: "#9898b8", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>Home</button>
        <button onClick={() => onNavigate("hall")} style={{ background: "none", border: "none", color: "#9898b8", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>纪念堂</button>
      </div>
    </nav>
  );
}

/* ── Main App ── */
export default function AetheriaApp() {
  const [page, setPage] = useState("landing");
  const [profileId, setProfileId] = useState(null);

  const navigate = useCallback((target, data) => {
    if (target === "profile" && data) setProfileId(data);
    setPage(target);
  }, []);

  return (
    <div style={{
      fontFamily: "'Inter',system-ui,sans-serif", background: "#0a0a0f", color: "#e0e0ff",
      minHeight: "100vh", position: "relative", overflow: "hidden",
    }}>
      {/* Global CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: rgba(99,102,241,0.3); color: #e0e0ff; }
        @keyframes glowPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes flicker { 0%,100% { opacity: 1; } 50% { opacity: 0.65; } }
        @keyframes particleFly {
          0% { opacity: 1; transform: translate(0,0) scale(1); }
          100% { opacity: 0; transform: translate(var(--ptx), var(--pty)) scale(0); }
        }
      `}</style>

      {/* Grain overlay */}
      <div style={{
        position: "fixed", inset: "-50%", width: "200%", height: "200%",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundSize: "128px", opacity: 0.03, pointerEvents: "none", zIndex: 9998,
      }} />

      {/* Vignette */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "radial-gradient(ellipse at center, transparent 50%, #0a0a0f 100%)",
      }} />

      <Navbar onNavigate={navigate} />

      {page === "landing" && <LandingPage onNavigate={navigate} />}
      {page === "hall" && <HallPage onNavigate={navigate} />}
      {page === "profile" && <ProfilePage memorialId={profileId} onNavigate={navigate} />}

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(42,42,74,0.15)", padding: 28, textAlign: "center", position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: 11, color: "rgba(152,152,184,0.5)" }}>
          Built with <span style={{ color: "rgba(240,171,252,0.6)" }}>♥</span> for those who live forever in memory
        </p>
        <p style={{ fontSize: 11, color: "rgba(152,152,184,0.35)", marginTop: 6 }}>
          Aetheria © 2026 — 赛博永生 · 数字记忆宫殿
        </p>
      </footer>
    </div>
  );
}
