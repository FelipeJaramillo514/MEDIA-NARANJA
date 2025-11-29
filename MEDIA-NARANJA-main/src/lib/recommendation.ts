export type Answers = {
  occasion?: string;
  recipient?: string;
  style?: string;
  budget?: number; // COP
};

export type ProductInfo = {
  id: string;
  name: string;
  price: number; // COP
  section: "catalogo" | "nuevos";
};

const PRODUCTS: ProductInfo[] = [
  { id: "blooming-love", name: "Blooming Love", price: 70000, section: "catalogo" },
  { id: "bouquet-little-special", name: "Bouquet Little Special", price: 38000, section: "catalogo" },
  { id: "bouquete-deluxe-15-anos", name: "Bouquet Deluxe 15 años", price: 70000, section: "catalogo" },
  { id: "diamond-bouquet", name: "Diamond Bouquet", price: 120000, section: "catalogo" },
  { id: "glow-bouquete", name: "Glow Bouquet", price: 35000, section: "catalogo" },
  { id: "glow-buquet", name: "Glow Bouquet (compacto)", price: 35000, section: "catalogo" },
  { id: "golden-roses", name: "Golden Roses", price: 70000, section: "catalogo" },
  { id: "luxury-bouquete", name: "Luxury Bouquet", price: 140000, section: "catalogo" },
  // Nuevos
  { id: "nuevo-atardecer-coral", name: "Atardecer Coral", price: 55000, section: "nuevos" },
  { id: "nuevo-brisa-pastel", name: "Brisa Pastel", price: 45000, section: "nuevos" },
  { id: "nuevo-romance-dorado", name: "Romance Dorado", price: 90000, section: "nuevos" },
];

const byId = new Map(PRODUCTS.map((p) => [p.id, p] as const));

const OCCASION_MAP: Record<string, string[]> = {
  cumple: ["brisa", "glow-bouquete", "blooming-love", "nuevo-atardecer-coral"],
  cumpleaños: ["nuevo-atardecer-coral", "glow-bouquete", "blooming-love"],
  aniversario: ["romance", "blooming-love", "romance-dorado", "nuevo-romance-dorado"],
  "15": ["bouquete-deluxe-15-anos", "luxury-bouquete"],
  quinceaños: ["bouquete-deluxe-15-anos", "luxury-bouquete"],
  graduación: ["diamond-bouquet", "golden-roses"],
  condolencias: ["brisa", "bouquet-little-special"],
};

const RECIPIENT_MAP: Record<string, string[]> = {
  madre: ["blooming-love", "golden-roses", "nuevo-romance-dorado"],
  mamá: ["blooming-love", "golden-roses", "nuevo-romance-dorado"],
  pareja: ["blooming-love", "nuevo-romance-dorado", "luxury-bouquete"],
  amiga: ["glow-bouquete", "bouquet-little-special", "nuevo-brisa-pastel"],
  amigo: ["glow-bouquete", "diamond-bouquet"],
  hija: ["bouquete-deluxe-15-anos", "nuevo-brisa-pastel"],
  cliente: ["diamond-bouquet", "golden-roses"],
};

const STYLE_MAP: Record<string, string[]> = {
  elegante: ["luxury-bouquete", "diamond-bouquet", "golden-roses"],
  romántico: ["blooming-love", "nuevo-romance-dorado"],
  romantico: ["blooming-love", "nuevo-romance-dorado"],
  minimalista: ["glow-buquet", "bouquet-little-special"],
  colorido: ["glow-bouquete", "nuevo-atardecer-coral"],
  suave: ["nuevo-brisa-pastel", "bouquet-little-special"],
};

function scoreProducts(answers: Answers): Map<string, number> {
  const score = new Map<string, number>();
  const inc = (id: string, v = 1) => score.set(id, (score.get(id) ?? 0) + v);

  const addFrom = (ids?: string[], weight = 1) => ids?.forEach((id) => inc(id, weight));

  // Occasion
  if (answers.occasion) {
    const key = answers.occasion.toLowerCase();
    Object.entries(OCCASION_MAP).forEach(([k, ids]) => {
      if (key.includes(k)) addFrom(ids, 3);
    });
  }

  // Recipient
  if (answers.recipient) {
    const key = answers.recipient.toLowerCase();
    Object.entries(RECIPIENT_MAP).forEach(([k, ids]) => {
      if (key.includes(k)) addFrom(ids, 2);
    });
  }

  // Style
  if (answers.style) {
    const key = answers.style.toLowerCase();
    Object.entries(STYLE_MAP).forEach(([k, ids]) => {
      if (key.includes(k)) addFrom(ids, 2);
    });
  }

  // Budget proximity
  if (typeof answers.budget === "number" && !Number.isNaN(answers.budget)) {
    for (const p of PRODUCTS) {
      const diff = Math.abs(p.price - answers.budget);
      // Closer = higher score
      const proximity = Math.max(0, 4 - Math.floor(diff / 20000)); // steps of 20k
      inc(p.id, proximity);
      // Soft budget ceiling preference
      if (p.price <= answers.budget) inc(p.id, 1);
    }
  }

  return score;
}

export function recommendProducts(answers: Answers, topK = 3) {
  const score = scoreProducts(answers);
  const ranked = PRODUCTS
    .map((p) => ({ p, s: score.get(p.id) ?? 0 }))
    .sort((a, b) => b.s - a.s || a.p.price - b.p.price)
    .slice(0, topK)
    .map((r) => r.p);

  return ranked;
}

export function buildReason(p: ProductInfo, a: Answers): string {
  const parts: string[] = [];
  if (a.occasion) parts.push(`ideal para ${a.occasion}`);
  if (a.recipient) parts.push(`pensado para ${a.recipient}`);
  if (a.style) parts.push(`con estilo ${a.style.toLowerCase()}`);
  return parts.length ? `Porque es ${parts.join(", ")}.` : "Por su composición y diseño.";
}

export function formatCOP(value: number): string {
  return value.toLocaleString("es-CO");
}

export function waLinkFor(p: ProductInfo): string {
  const section = p.section === "nuevos" ? "NUEVOS" : "CATÁLOGO";
  const msg = `Hola, quiero ordenar el ramo ${p.name} de la sección ${section}.`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

export { PRODUCTS, byId };
