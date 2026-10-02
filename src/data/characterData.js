export const characterData = {
  name: "Marco Polo Silva",
  roleTitle: "FULLSTACK ARCHITECT",
  classBadge: "CODE PALADIN // LVL 28",
  level: 28,
  avatarUrl: "/assets/images/hero_anime.jpg",
  stats: {
    hp: { current: 100, max: 100, label: "HP" },
    mp: { current: 150, max: 150, label: "MP" },
    xp: { current: 8450, max: 10000, label: "XP" },
  },
  quickMetrics: [
    { label: "AÑOS EXP", value: 5, suffix: "+", color: "mana" },
    { label: "MISIONES", value: 34, suffix: "+", color: "ember" },
    { label: "RESILIENCIA", value: 99.9, suffix: "%", color: "xp" },
    { label: "TECNOLOGÍAS", value: 16, suffix: "+", color: "magic" },
  ],
  attributes: [
    { key: "STR", name: "Arquitectura & Backend", value: 92, tier: "Master" },
    { key: "INT", name: "Algoritmos & Lógica", value: 96, tier: "Grand Master" },
    { key: "AGI", name: "Velocidad & Prototipado", value: 90, tier: "Master" },
    { key: "VIT", name: "Testing & Resiliencia", value: 88, tier: "Adept" },
    { key: "WIS", name: "Diseño de Sistemas & UX", value: 94, tier: "Master" },
  ],
  loreSummary: "Especialista en arquitecturas web reactivas, microservicios resilientes e interfaces de alto rendimiento con foco en experiencia de usuario y cero fricción.",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:contacto@marcopolo.dev",
  },
  perks: [
    { title: "Clean Code Aura", tag: "PASIVA", desc: "Mantenimiento ágil y código autodocumentado." },
    { title: "High Concurrency", tag: "COMBATE", desc: "APIs y sockets tolerantes a picos de tráfico." },
    { title: "Zero Latency UX", tag: "MAGIA", desc: "Microinteracciones fluidas a 60fps constantes." },
    { title: "Cloud Automation", tag: "RUNA", desc: "Pipelines de despliegue continuo sin downtime." },
  ]
};
