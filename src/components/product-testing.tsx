import { batchReports } from "@/lib/batches";
import { aurumCertificateDirectory, getAurumProduct } from "@/lib/aurum-catalog";
import { ArrowIcon } from "./arrow-icon";
import styles from "./product-testing.module.css";

export function ProductTesting({ slug, name }: { slug: string; name: string }) {
  const source = getAurumProduct(slug);
  if (source) return (
    <section id="batch-report" className={styles.banner} aria-labelledby="testing-title">
      <div className={styles.status}>Certificates of analysis / Aurum Peptide Labs</div>
      <div className={styles.body}>
        <div className={styles.evidence}>
          <p className={styles.eyebrow}>{name} / Published laboratory reports</p>
          <h2 id="testing-title">Read the analysis.<br /><em>Check the details.</em></h2>
          <p>Reports published by Aurum Peptide Labs, listed by the sample size on each certificate.</p>
        </div>
        <div className={styles.reports}>
          {source.certificates.length > 0 ? source.certificates.map(certificate => (
            <a key={certificate.url} className={styles.cta} href={certificate.url} target="_blank" rel="noopener noreferrer">{certificate.label} / Certificate (PDF) <ArrowIcon /></a>
          )) : <p className={styles.notice}>Aurum has not published a product-specific certificate in its directory.</p>}
          <a className={styles.cta} href={aurumCertificateDirectory} target="_blank" rel="noopener noreferrer">Aurum certificate directory <ArrowIcon /></a>
        </div>
      </div>
      <div className={styles.footer}>
        <div><p className={styles.eyebrow}>Source checked / October 11, 2026</p><p>Aurum Peptide Labs · Third-party reference reports</p></div>
        <div className={styles.scope}><p>Results apply to the labeled samples. These reports do not verify SALT N’ PEP inventory or unlisted vial sizes.</p><p>Purity alone does not establish sterility, safety, or suitability for human use.</p></div>
      </div>
    </section>
  );
  const report = batchReports[slug];
  if (!report) return null;
  return (
    <section id="batch-report" className={styles.banner} aria-labelledby="testing-title">
      <div className={styles.status}>Example report / Inventory batch pending</div>
      <div className={styles.body}>
        <div>
          <p className={styles.eyebrow}>Lumira / {name} / {report.dosage} sample</p>
          <p className={styles.purity}>{report.purity}</p>
          <p className={styles.label}>Reported sample purity · HPLC</p>
        </div>
        <div className={styles.evidence}>
          <h2 id="testing-title">See the science.<br /><em>Read the report.</em></h2>
          <p>Third-party analysis by <strong>{report.lab}</strong>.<br />Report issued {report.issued}.</p>
          <a className={styles.cta} href={report.pdf} target="_blank" rel="noopener noreferrer">View lab report (PDF) <ArrowIcon /></a>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <p className={styles.eyebrow}>Example batch / Peptaura registry</p>
          <a className={styles.batch} href={`https://www.peptaura.com/verify?batch=${encodeURIComponent(report.batch)}`} target="_blank" rel="noopener noreferrer">{report.batch} <ArrowIcon /></a>
          {report.reportLot && <p>PDF lot: {report.reportLot}</p>}
        </div>
        <div className={styles.scope}>
          <p>This is a reference report, not verification of SALT N’ PEP inventory. Results apply only to the tested {report.dosage} samples and do not verify every size offered.</p>
          {report.note && <p className={styles.notice}>{report.note}</p>}
          <p>Purity alone does not establish sterility, safety, or suitability for human use.</p>
        </div>
      </div>
    </section>
  );
}
