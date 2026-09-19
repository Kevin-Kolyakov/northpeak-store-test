export interface Review {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
}

export const SEED_REVIEWS: Record<string, Review[]> = {
  "alpine-down-parka": [
    { author: "Priya K.", rating: 5, title: "Warmest jacket I own", body: "Wore this through a Minnesota January and never once felt the cold." },
    { author: "Dan R.", rating: 4, title: "Great but heavy", body: "Excellent warmth, just bulkier than I expected for layering under a shell." },
  ],
  "summit-insulated-jacket": [
    { author: "Marcus T.", rating: 5, title: "Perfect for commuting", body: "Light enough to wear all day at the office and warm enough for the walk in." },
    { author: "Elena V.", rating: 4, title: "Runs a little large", body: "Sized down and it fit exactly as I hoped. Great value." },
  ],
  "ridgeline-shell": [
    { author: "Sam O.", rating: 5, title: "Actually waterproof", body: "Stood in a downpour for twenty minutes at a trailhead and stayed bone dry." },
    { author: "Kayla B.", rating: 5, title: "Packs down tiny", body: "Fits in the bottom of my day pack and I forget it's there until I need it." },
  ],
  "glacier-3-in-1-jacket": [
    { author: "Nora F.", rating: 4, title: "Versatile", body: "Love being able to wear the liner alone in fall and zip it in for winter." },
    { author: "Grace L.", rating: 3, title: "Liner zipper is stiff", body: "Great concept, but the zip-together zipper takes some effort to line up." },
  ],
  "birchwood-wool-coat": [
    { author: "Isabel M.", rating: 5, title: "Elegant and warm", body: "Gets compliments every time I wear it. The satin lining feels genuinely nice." },
  ],
  "harbor-wool-sweater": [
    { author: "Owen P.", rating: 5, title: "Soft, not itchy", body: "I'm sensitive to wool and this one doesn't bother me at all." },
    { author: "Theo J.", rating: 4, title: "Great layering piece", body: "Fits well over a base layer without feeling bulky." },
  ],
  "trailhead-flannel-shirt": [
    { author: "Casey W.", rating: 5, title: "Lives in rotation", body: "Soft from the first wash and the elbows have held up to a season of yard work." },
  ],
  "summit-base-layer-tee": [
    { author: "Riley H.", rating: 4, title: "Does the job", body: "Wicks well on cold runs. Wish it came in more colors." },
  ],
  "glacier-knit-beanie": [
    { author: "Ana S.", rating: 5, title: "Stays put", body: "Doesn't ride up like my old beanie did, even in wind." },
  ],
  "ridgeline-leather-gloves": [
    { author: "Miguel D.", rating: 4, title: "Touchscreen works well", body: "Handy to answer texts without taking these off in the cold." },
  ],
};

export function averageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}
