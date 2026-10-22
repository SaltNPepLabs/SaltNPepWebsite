import { catalogSlug, catalogWording } from "./catalog-naming";
import { aurumCatalog, aurumQuantityPricing, getAurumProduct } from "./aurum-catalog";

export interface Product {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  category: string;
  price: number; // per vial
  dosage: string;
  format: string;
  purity: string;
  casNumber: string;
  molecularFormula: string;
  molecularWeight: string;
  sequence?: string;
  bulkPricing: { qty: number; price: number }[];
  researchAreas: string[];
  keyStudies: {
    title: string;
    authors: string;
    journal: string;
    year: number;
    finding: string;
    doi?: string;
  }[];
  mechanism: string;
  storage: string;
  reconstitution: string;
}

const productRecords: Product[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    shortName: "BPC-157",
    tagline: "Synthetic Pentadecapeptide",
    description: "BPC-157 is a synthetic peptide consisting of 15 amino acids. Supplied as lyophilized powder for laboratory research only.",
    category: "Synthetic Peptides",
    price: 39.99,
    dosage: "5mg",
    format: "Lyophilized powder",
    purity: "99.1%",
    casNumber: "137525-51-0",
    molecularFormula: "C62H98N16O22",
    molecularWeight: "1419.53 g/mol",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    bulkPricing: [
      { qty: 1, price: 39.99 },
      { qty: 3, price: 35.99 },
      { qty: 5, price: 32.99 },
      { qty: 10, price: 29.99 },
    ],
    researchAreas: [],
    keyStudies: [],
    mechanism: "",
    storage: "",
    reconstitution:
      "Preparation conditions must be established for the specific laboratory assay. This site does not provide personal-use mixing or administration instructions.",

  },
  {
    slug: "retatrutide",
    name: "Retatrutide (LY-3437943)",
    shortName: "Retatrutide",
    tagline: "LY-3437943 Research Compound",
    description: "GLP-3 is our catalog label for LY-3437943. Supplied as lyophilized powder for laboratory research only.",
    category: "Research Peptides",
    price: 89.99,
    dosage: "5mg",
    format: "Lyophilized powder",
    purity: "98.7%",
    casNumber: "2381089-83-2",
    molecularFormula: "C189H300N52O59",
    molecularWeight: "4113.7 g/mol",
    bulkPricing: [
      { qty: 1, price: 89.99 },
      { qty: 3, price: 82.99 },
      { qty: 5, price: 76.99 },
      { qty: 10, price: 69.99 },
    ],
    researchAreas: [],
    keyStudies: [],
    mechanism: "",
    storage: "",
    reconstitution:
      "Preparation conditions must be established for the specific laboratory assay. This site does not provide personal-use mixing or administration instructions.",

  },
  {
    slug: "tb-500",
    name: "TB-500",
    shortName: "TB-500",
    tagline: "Laboratory Research Peptide",
    description: "TB-500 is supplied as lyophilized powder for laboratory research only. The catalog name alone does not establish a particular amino-acid sequence or equivalence to full-length thymosin beta-4. Request the batch-specific identity specification before selecting this material for an assay.",
    category: "Research Peptides",
    price: 34.99,
    dosage: "5mg",
    format: "Lyophilized powder",
    purity: "99.3%",
    casNumber: "",
    molecularFormula: "",
    molecularWeight: "",
    bulkPricing: [
      { qty: 1, price: 34.99 },
      { qty: 3, price: 31.99 },
      { qty: 5, price: 28.99 },
      { qty: 10, price: 25.99 },
    ],
    researchAreas: [],
    keyStudies: [],
    mechanism: "",
    storage: "",
    reconstitution:
      "Preparation conditions must be established for the specific laboratory assay. This site does not provide personal-use mixing or administration instructions.",

  },
  {
    slug: "mt-2",
    name: "Melanotan II (MT-2)",
    shortName: "MT-2",
    tagline: "Synthetic Cyclic Peptide",
    description: "Melanotan II (MT-2) is a synthetic cyclic peptide. Supplied as lyophilized powder for laboratory research only.",
    category: "Cyclic Peptides",
    price: 24.99,
    dosage: "10mg",
    format: "Lyophilized powder",
    purity: "99.0%",
    casNumber: "121062-08-6",
    molecularFormula: "C50H69N15O9",
    molecularWeight: "1024.18 g/mol",
    sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2",
    bulkPricing: [
      { qty: 1, price: 24.99 },
      { qty: 3, price: 22.99 },
      { qty: 5, price: 19.99 },
      { qty: 10, price: 17.99 },
    ],
    researchAreas: [],
    keyStudies: [],
    mechanism: "",
    storage: "",
    reconstitution:
      "Preparation conditions must be established for the specific laboratory assay. This site does not provide personal-use mixing or administration instructions.",

  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    shortName: "MOTS-c",
    tagline: "Synthetic 16-Amino-Acid Peptide",
    description: "MOTS-c is a synthetic peptide consisting of 16 amino acids. Supplied as lyophilized powder for laboratory research only.",
    category: "Synthetic Peptides",
    price: 59.99,
    dosage: "10mg",
    format: "Lyophilized powder",
    purity: "98.9%",
    casNumber: "1627580-64-6",
    molecularFormula: "C101H152N28O22S2",
    molecularWeight: "2174.6 g/mol",
    sequence: "Met-Arg-Trp-Gln-Glu-Met-Gly-Tyr-Ile-Phe-Tyr-Pro-Arg-Lys-Leu-Arg",
    bulkPricing: [
      { qty: 1, price: 59.99 },
      { qty: 3, price: 54.99 },
      { qty: 5, price: 49.99 },
      { qty: 10, price: 44.99 },
    ],
    researchAreas: [],
    keyStudies: [],
    mechanism: "",
    storage: "",
    reconstitution:
      "Preparation conditions must be established for the specific laboratory assay. This site does not provide personal-use mixing or administration instructions.",

  },
  {
    slug: "pinealon",
    name: "Pinealon (EDR)",
    shortName: "Pinealon",
    tagline: "Synthetic Tripeptide / EDR",
    description: "Pinealon is a synthetic tripeptide with the sequence Glu-Asp-Arg (EDR). Supplied as lyophilized powder for laboratory research only.",
    category: "Tripeptides",
    price: 44.99,
    dosage: "10mg",
    format: "Lyophilized powder",
    purity: "99.0%",
    casNumber: "175175-23-2",
    molecularFormula: "C15H26N6O8",
    molecularWeight: "418.4 g/mol",
    sequence: "Glu-Asp-Arg",
    bulkPricing: [
      { qty: 1, price: 44.99 },
      { qty: 3, price: 39.99 },
      { qty: 5, price: 35.99 },
      { qty: 10, price: 31.99 },
    ],
    researchAreas: [],
    keyStudies: [],
    mechanism: "",
    storage: "",
    reconstitution:
      "Preparation conditions must be established for the specific laboratory assay. This site does not provide personal-use mixing or administration instructions.",

  },
  {
    slug: "epitalon",
    name: "Epitalon (AEDG)",
    shortName: "Epitalon",
    tagline: "Synthetic Tetrapeptide / AEDG",
    description: "Epitalon, also called Epithalon, is a synthetic tetrapeptide with the sequence Ala-Glu-Asp-Gly (AEDG). Supplied as lyophilized powder for laboratory research only.",
    category: "Tetrapeptides",
    price: 29.99,
    dosage: "10mg",
    format: "Lyophilized powder",
    purity: "99.2%",
    casNumber: "307297-39-8",
    molecularFormula: "C14H22N4O9",
    molecularWeight: "390.35 g/mol",
    sequence: "Ala-Glu-Asp-Gly",
    bulkPricing: [
      { qty: 1, price: 29.99 },
      { qty: 3, price: 26.99 },
      { qty: 5, price: 23.99 },
      { qty: 10, price: 20.99 },
    ],
    researchAreas: [],
    keyStudies: [],
    mechanism: "",
    storage: "",
    reconstitution:
      "Preparation conditions must be established for the specific laboratory assay. This site does not provide personal-use mixing or administration instructions.",

  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    shortName: "GHK-Cu",
    tagline: "Copper Tripeptide Complex",
    description: "GHK-Cu is a copper-binding tripeptide complex based on glycyl-L-histidyl-L-lysine. Supplied as lyophilized powder for laboratory research only.",
    category: "Copper Peptides",
    price: 24.99,
    dosage: "50mg",
    format: "Lyophilized powder",
    purity: "99.0%",
    casNumber: "89030-95-5",
    molecularFormula: "C14H24CuN6O4",
    molecularWeight: "403.92 g/mol",
    sequence: "Gly-His-Lys-Cu",
    bulkPricing: [
      { qty: 1, price: 24.99 },
      { qty: 3, price: 22.99 },
      { qty: 5, price: 19.99 },
      { qty: 10, price: 17.99 },
    ],
    researchAreas: [],
    keyStudies: [],
    mechanism: "",
    storage: "",
    reconstitution:
      "Preparation conditions must be established for the specific laboratory assay. This site does not provide personal-use mixing or administration instructions.",

  },
];

// Keep existing cart and checkout identities stable while changing public names.
const currentProducts = productRecords.filter(product => getAurumProduct(product.slug)).map(product => {
  const source = getAurumProduct(product.slug);
  const variant = source?.variants[0];
  return {
    ...catalogWording(product),
    slug: product.slug,
    ...(variant && { dosage: variant.dosage, price: variant.price, bulkPricing: aurumQuantityPricing(variant.price) }),
  };
});

function storefrontCategory(category: string): string {
  return ["Cognitive Research", "Metabolic Research", "Longevity Research"].includes(category) ? "Research Peptides" : category;
}

const additions: Product[] = aurumCatalog.filter(source => !productRecords.some(product => product.slug === source.slug)).map(source => ({
  slug: source.slug,
  name: source.name,
  shortName: source.name,
  tagline: `${storefrontCategory(source.category)} · Research use only`,
  description: `${source.name} is supplied as a laboratory research ${source.slug === "bacteriostatic-water" ? "solvent" : "compound"} in the vial sizes listed above. For research use only.`,
  category: storefrontCategory(source.category),
  price: source.variants[0].price,
  dosage: source.variants[0].dosage,
  format: source.slug === "bacteriostatic-water" ? "Liquid solvent" : "Lyophilized powder",
  purity: "",
  casNumber: "",
  molecularFormula: "",
  molecularWeight: "",
  bulkPricing: aurumQuantityPricing(source.variants[0].price),
  researchAreas: [],
  keyStudies: [],
  mechanism: "",
  storage: "",
  reconstitution: "",
}));

// Owner direction: consistent per-vial pricing, with no quantity discounts.
export const products: Product[] = [...currentProducts, ...additions].map(product => ({ ...product, category: product.category.replace(/Peptides/g, "Compounds").replace(/Tripeptides/g, "Three-amino-acid Compounds").replace(/Tetrapeptides/g, "Four-amino-acid Compounds"), tagline: product.tagline.replace(/Peptides/g, "Compounds").replace(/Tripeptides/g, "Three-amino-acid Compounds").replace(/Tetrapeptides/g, "Four-amino-acid Compounds"), bulkPricing: aurumQuantityPricing(product.price) }));

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug || catalogSlug(p.slug) === slug);
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
