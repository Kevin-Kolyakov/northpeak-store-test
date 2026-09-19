export const SIZES = ["XS", "S", "M", "L", "XL"] as const;
export type Size = (typeof SIZES)[number];

export type Category = "mens-jackets" | "womens-jackets" | "sweaters-layers" | "accessories";

export const CATEGORIES: { slug: Category; name: string }[] = [
  { slug: "mens-jackets", name: "Men's Jackets" },
  { slug: "womens-jackets", name: "Women's Jackets" },
  { slug: "sweaters-layers", name: "Sweaters & Layers" },
  { slug: "accessories", name: "Accessories" },
];

export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  care: string;
  sizes: readonly Size[];
  soldOutSizes: Size[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "alpine-down-parka",
    name: "Alpine Down Parka",
    category: "mens-jackets",
    price: 349,
    description: "Our warmest parka, filled with 700-fill responsibly sourced down and finished with a storm hood.",
    care: "Spot clean. Professional down cleaning recommended.",
    sizes: SIZES,
    soldOutSizes: ["M"],
  },
  {
    slug: "summit-insulated-jacket",
    name: "Summit Insulated Jacket",
    category: "mens-jackets",
    price: 279,
    description: "A lightweight synthetic-insulated jacket built for cold, dry trailheads and city commutes alike.",
    care: "Machine wash cold, tumble dry low.",
    sizes: SIZES,
    soldOutSizes: ["M"],
  },
  {
    slug: "ridgeline-shell",
    name: "Ridgeline Shell",
    category: "mens-jackets",
    price: 229,
    description: "A fully seam-sealed waterproof shell that packs down into its own chest pocket.",
    care: "Machine wash cold. Do not iron.",
    sizes: SIZES,
    soldOutSizes: [],
  },
  {
    slug: "glacier-3-in-1-jacket",
    name: "Glacier 3-in-1 Jacket",
    category: "womens-jackets",
    price: 319,
    description: "A waterproof shell that zips together with a removable insulated liner for three ways to wear it.",
    care: "Machine wash cold. Do not iron. Liner: dry clean only.",
    sizes: SIZES,
    soldOutSizes: [],
  },
  {
    slug: "birchwood-wool-coat",
    name: "Birchwood Wool Coat",
    category: "womens-jackets",
    price: 298,
    description: "A double-breasted wool-blend coat with a smooth satin lining, cut for layering over knitwear.",
    care: "Dry clean only.",
    sizes: SIZES,
    soldOutSizes: ["XS", "S"],
  },
  {
    slug: "harbor-wool-sweater",
    name: "Harbor Wool Sweater",
    category: "sweaters-layers",
    price: 128,
    description: "A midweight crewneck knit from a merino-wool blend, sized for wearing over a base layer.",
    care: "Hand wash cold, lay flat to dry.",
    sizes: SIZES,
    soldOutSizes: ["S"],
  },
  {
    slug: "trailhead-flannel-shirt",
    name: "Trailhead Flannel Shirt",
    category: "sweaters-layers",
    price: 89,
    description: "A brushed cotton flannel with reinforced elbows, built to be worn open over a tee or buttoned to the collar.",
    care: "Machine wash cold, tumble dry low.",
    sizes: SIZES,
    soldOutSizes: [],
  },
  {
    slug: "summit-base-layer-tee",
    name: "Summit Base Layer Tee",
    category: "sweaters-layers",
    price: 45,
    description: "A moisture-wicking merino base layer that regulates temperature under a shell or on its own.",
    care: "Machine wash cold, hang to dry.",
    sizes: SIZES,
    soldOutSizes: [],
  },
  {
    slug: "glacier-knit-beanie",
    name: "Glacier Knit Beanie",
    category: "accessories",
    price: 32,
    description: "A ribbed wool-blend beanie with a folded cuff, knit in Nova Scotia.",
    care: "Hand wash cold, lay flat to dry.",
    sizes: ["S", "M", "L"] as const,
    soldOutSizes: [],
  },
  {
    slug: "ridgeline-leather-gloves",
    name: "Ridgeline Leather Gloves",
    category: "accessories",
    price: 68,
    description: "Touchscreen-compatible leather gloves lined with brushed fleece.",
    care: "Wipe clean. Leather conditioner as needed.",
    sizes: ["S", "M", "L", "XL"] as const,
    soldOutSizes: ["S"],
  },
];

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
}

export function isInStock(product: Product, size: string): boolean {
  return !product.soldOutSizes.includes(size as Size);
}

/** True once every size is gone. Distinct from a single sold-out size. */
export function isFullyOutOfStock(product: Product): boolean {
  return product.sizes.every((size) => product.soldOutSizes.includes(size));
}

/** True once at least one size is gone, so listings could flag "limited stock" if they used it. */
export function hasLimitedStock(product: Product): boolean {
  return product.soldOutSizes.length > 0 && !isFullyOutOfStock(product);
}
