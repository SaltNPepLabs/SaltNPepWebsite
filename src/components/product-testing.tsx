import { batchReports, additionalBatchReports, usesLumiraCertificate } from "@/lib/batches";
import { aurumCertificateDirectory, getAurumProduct } from "@/lib/aurum-catalog";
import reportMetadata from "@/lib/coa-metadata.json";
import purityResults from "@/lib/coa-purity.json";
import downloads from "@/lib/coa-downloads.json";
import { ArrowIcon } from "./arrow-icon";
import styles from "./product-testing.module.css";

function ReportActions({ url, name }: { url: string; name: string }) {
  const download = (downloads as Record<string, string>)[url];
  return <div className={styles.actions}>
    <a className={styles.view} href={download ? download.replace(/\.pdf$/, ".html") : url} target="_blank" rel="noopener noreferrer" aria-label={`View ${name} COA`}>View report <ArrowIcon /></a>
    {download && <a className={styles.download} href={download} download={`${name.replace(/[^a-zA-Z0-9-]+/g, "-")}-COA.pdf`} aria-label={`Download ${name} COA`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M4 15v5h16v-5" /></svg>Download</a>}
  </div>;
}

export function ProductTesting({ slug, name }: { slug: string; name: string }) {
  const source = usesLumiraCertificate(slug) ? undefined : getAurumProduct(slug);
  const report = source ? undefined : batchReports[slug];
  if (!source && !report) return null;
  const reports = source ? source.certificates : [{ label: report!.dosage, url: report!.pdf }, ...(additionalBatchReports[slug] ?? [])];
  const primaryPurity = report?.purity ?? (purityResults as Record<string, string>)[reports[0]?.url];
  return <section id="batch-report" className={styles.banner} aria-labelledby="testing-title">
    <div className={styles.header}><p className={styles.eyebrow}>{name} · Documentation</p><span className={styles.badge}>{reports.length ? "COA available" : "Report pending"}</span></div>
    <div className={styles.body}>
      <div className={styles.intro}>
        <h2 id="testing-title">Certificate<br />of Analysis</h2>
        {primaryPurity ? <div className={styles.result}><span className={styles.purity}>{primaryPurity}</span><span className={styles.label}>Reported HPLC purity · {reports[0]?.label}</span></div> : <p className={styles.label}>Laboratory reports.<br />Batch details. Direct access.</p>}
      </div>
      <div className={styles.reports}>
        {reports.map((item, index) => <div className={styles.report} key={item.url}>
          <div className={styles.reportTitle}><span>{report && index > 0 ? "Additional report" : "Lab report"}</span><strong>{item.label.replace(" · Additional supplier report", "")}</strong></div>
          {(() => {
            const facts = report && index === 0
              ? { lab: report.lab, issued: report.issued, batch: report.reportLot ?? report.batch }
              : (reportMetadata as Record<string, {lab: string; issued: string; batch: string}>)[item.url];
            return facts && <dl className={styles.facts}>
              <div><dt>Laboratory</dt><dd>{facts.lab}</dd></div>
              <div><dt>Report issued</dt><dd>{facts.issued}</dd></div>
              <div><dt>Report lot</dt><dd>{facts.batch}</dd></div>
            </dl>;
          })()}
          {source && index > 0 && (purityResults as Record<string, string>)[item.url] && <p className={styles.reportPurity}>{(purityResults as Record<string, string>)[item.url]} <span>reported purity</span></p>}
          <ReportActions url={item.url} name={`${name}-${item.label}`} />
          {report?.contentNotice && index === 0 && <p className={styles.contentNote}>{report.contentNotice}</p>}
          {report && index > 0 && <p className={styles.scope}>For the size listed in this report; not the 10mg vial.</p>}
        </div>)}
        {!reports.length && <p className={styles.label}>A report has not been published yet.</p>}
      </div>
    </div>
    <details className={styles.details}><summary>Report details & scope</summary><div className={styles.detailContent}>
      <p>Report source: {report ? "Lumira / Peptaura" : "Aurum Peptide Labs"}</p>
      {report && <p>Supplier batch record: <a href={`https://www.peptaura.com/verify?batch=${encodeURIComponent(report.batch)}`} target="_blank" rel="noopener noreferrer">{report.batch} ↗</a></p>}
      {report?.note && <p>{report.note}</p>}
      {source && <a href={aurumCertificateDirectory} target="_blank" rel="noopener noreferrer">Aurum certificate directory ↗</a>}
      <p>Results apply to the tested batch and size. For laboratory research only. Purity does not establish sterility or suitability for human use.</p>
    </div></details>
  </section>;
}
