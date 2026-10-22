import { products } from "./products";
import { batchReports, additionalBatchReports, usesLumiraCertificate } from "./batches";
import { getAurumProduct } from "./aurum-catalog";
import { catalogSlug } from "./catalog-naming";
export const coaLibrary = products.map(product => {
  const source = usesLumiraCertificate(product.slug) ? undefined : getAurumProduct(product.slug);
  const batch = batchReports[product.slug === "glp-3" ? "retatrutide" : product.slug];
  return {
    slug: catalogSlug(product.slug), name: product.shortName,
    supplier: source ? "Aurum" : "Lumira / Peptaura",
    reports: source ? source.certificates.map(report => ({ label: report.label, url: report.url })) : batch ? [{ label: batch.dosage, url: batch.pdf }, ...(additionalBatchReports[product.slug] ?? [])] : [],
    batch: !source && batch ? batch.batch : "",
    lab: !source && batch ? batch.lab : "",
    issued: !source && batch ? batch.issued : "",
    note: !source && batch ? [batch.contentNotice, batch.note].filter(Boolean).join(" ") : "",
  };
});
