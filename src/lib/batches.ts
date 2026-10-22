// Reference reports only. Replace with inventory-matched records before claiming stock purity.
export interface BatchReport {
  supplier: "Lumira";
  batch: string;
  reportLot?: string;
  dosage: string;
  purity: string;
  lab: string;
  issued: string;
  pdf: string;
  note?: string;
  contentNotice?: string;
}

const pdf = (hash: string) => `https://www.peptaura.com/coas/${hash}.pdf`;
export const batchReports: Record<string, BatchReport> = {
  "bpc-157": {
    supplier: "Lumira", batch: "WL-BC10-000299", reportLot: "JBF6N3D", dosage: "10mg", purity: "99.6%",
    lab: "BTLabs", issued: "August 10, 2026",
    pdf: pdf("ec3fe9be9f7fb37d67508b453b24825952386602c4a1b26493c1572fdad1913d"),
    note: "Peptaura batch: WL-BC10-000299. Laboratory sample lot: JBF6N3D. Measured content: 9.1mg. Match the report to the lot on your vial.",
  },
  retatrutide: {
    supplier: "Lumira", batch: "WL-RT30-P00521", reportLot: "CW7KA2N", dosage: "30mg", purity: "99.9%",
    lab: "BTLabs", issued: "August 10, 2026",
    pdf: pdf("f191fd70f1fd8edf4807af1a0ed2047cbb57d938e7f2df02011e010c183d58c6"),
    contentNotice: "Measured content: 25.2mg · Labeled amount: 30mg",
    note: "Peptaura batch: WL-RT30-P00521. Laboratory sample lot: CW7KA2N. Match the report to the lot on your vial.",
  },
  "tb-500": {
    supplier: "Lumira", batch: "PPA-WL-TB10-P00714", dosage: "10mg", purity: "99.6%",
    lab: "BTLabs", issued: "September 3, 2026",
    pdf: pdf("d39f0faf1307c80e5389b4a41d8eb4c5f56708c16c9d6d7d49253233fd930adf"),
  },
  "mt-2": {
    supplier: "Lumira", batch: "WL-ML10-P00518", dosage: "10mg", purity: "99.8%",
    lab: "BTLabs", issued: "June 12, 2026",
    pdf: pdf("2471b3812b40b94f05351af060cc6aa24baf6ae93b568e3be97716c9b39226d7"),
  },
  "mots-c": {
    supplier: "Lumira", batch: "PPA-WL-MS10-P00703", dosage: "10mg", purity: "99.2%",
    lab: "Pacific Coast Biologics", issued: "July 19, 2026",
    pdf: pdf("47f888c4f48c1e041b844c1dd9a6e638ec05d08fc2b745b22cc389fc0afc3c74"),
  },
  pinealon: {
    supplier: "Lumira", batch: "PPA-WL-PL10-P00702", dosage: "10mg", purity: "99.5%",
    lab: "BTLabs", issued: "September 3, 2026",
    pdf: pdf("28970caff49954c4af5031139d7e5aaa74098d0f8c64a1d607603250de664eeb"),
  },
  epitalon: {
    supplier: "Lumira", batch: "WL-ET10-P00518", dosage: "10mg", purity: "99.46%",
    lab: "Freedom Diagnostics", issued: "August 6, 2026",
    pdf: pdf("a997ef2f6ac038f867a7aca21d329ef287b9ca8ad412a442b726f9c2d4be6144"),
    note: "Two sampled vials reported 99.46% and 99.47% purity. The lower result is displayed.",
  },
  "ghk-cu": {
    supplier: "Lumira", batch: "PPA-WL-CU50-P00705", dosage: "50mg", purity: "99.8%",
    lab: "Pacific Coast Biologics", issued: "July 30, 2026",
    pdf: pdf("541e0af68fe283b710a5f38dc2dde1e496e1a753281ecbb1375f9554bb44bdc1"),
  },
};

// Owner-requested supplier overrides; other certificate presentation is unchanged.
export function usesLumiraCertificate(slug: string): boolean {
  return ["bpc-157", "retatrutide", "glp-3", "tb-500", "mots-c"].includes(slug);
}


// Additional supplier report; MOTS-C remains available to purchase in 10mg only.
export const additionalBatchReports: Record<string, {label: string; url: string}[]> = {
  "mots-c": [{label: "40mg · Additional supplier report", url: pdf("f70c35017b1af5cae212704b896e1c58703b834adefa74e350290b2546e506de")}],
};
