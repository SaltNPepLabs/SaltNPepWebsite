import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | SALT N’ PEP",
  description: "Frequently asked questions about ordering research compounds, shipping, and more.",
};

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What are research compounds?",
        a: "Research compounds are materials supplied for laboratory and scientific research. Review each product’s specifications and available documentation for its composition and format. All products sold by SALT N’ PEP are for research use only.",
      },
      {
        q: "Are these products for human consumption?",
        a: "No. All products sold by SALT N’ PEP are intended for laboratory and research use only. They are not for personal use or administration to humans or animals, and they are not intended to diagnose, treat, cure, or prevent any disease. By purchasing, you agree to use them solely for legitimate research purposes.",
      },
    ],
  },
  {
    category: "Products & Quality",
    questions: [
      {
        q: "What purity are your compounds?",
        a: "All of our compounds are tested to 98%+ purity minimum. Most batches test at 99%+. Purity is verified via High-Performance Liquid Chromatography (HPLC) and confirmed with mass spectrometry. The exact purity percentage for each product is listed on its product page.",
      },
      {
        q: "Do you provide Certificates of Analysis (COA)?",
        a: "Yes. Every batch of every product is independently tested. A Certificate of Analysis showing HPLC purity results and mass spectrometry data is included with every order. COAs are also available for download on each product page.",
      },
      {
        q: "What form do the compounds come in?",
        a: "All compounds are supplied as lyophilized (freeze-dried) powder in sealed, sterile glass vials.",
      },
      {
        q: "Do you provide mixing or administration instructions?",
        a: "We do not provide personal-use mixing, dosing, injection, or administration instructions. Preparation conditions for laboratory work must be established for the specific assay. Products are not for personal use or administration to humans or animals.",
      },
    ],
  },
  {
    category: "Ordering & Shipping",
    questions: [
      {
        q: "Do you offer bulk discounts?",
        a: "No. Each vial has the same unit price regardless of quantity. Your total updates as you select the number of vials.",
      },
      {
        q: "How are orders shipped?",
        a: "Shipping is free within our supported US delivery area. The Utah County cutoff is 11 a.m. Mountain Time: before the cutoff, delivery is the next day; at or after it, delivery is two days later. Service runs seven days a week; holiday schedules may vary. Outside Utah County, the same cutoff determines when the parcel ships, with carrier transit time additional. See the Delivery page for current information.",
      },
      {
        q: "Do you ship internationally?",
        a: "Currently we ship within the United States only. Regulations regarding research compounds vary by country, and we want to ensure full compliance. We are evaluating international shipping and will announce availability when ready.",
      },
      {
        q: "What payment methods do you accept?",
        a: "Payment processing is coming soon. We are currently setting up our payment infrastructure. Check back shortly for available payment methods.",
      },
    ],
  },
  {
    category: "About Our Products",
    questions: [
      {
        q: "What is BPC-157?",
        a: "BPC-157 is a synthetic compound consisting of 15 amino acids. Supplied as lyophilized powder for laboratory research only.",
      },
      {
        q: "What is GLP-3?",
        a: "GLP-3 is our catalog label for LY-3437943. Supplied as lyophilized powder for laboratory research only.",
      },
      {
        q: "What is TB-500?",
        a: "TB-500 is supplied as lyophilized powder for laboratory research only. The catalog name alone does not establish a particular amino-acid sequence or equivalence to full-length thymosin beta-4. Request the batch-specific identity specification before selecting this material for an assay.",
      },
      {
        q: "What is MT-2 (Melanotan II)?",
        a: "Melanotan II (MT-2) is a synthetic cyclic compound. Supplied as lyophilized powder for laboratory research only.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-normal tracking-tight">Good to know.</h1>
        <p className="mt-4 text-muted text-lg">
          Everything you need to know about ordering research compounds from SALT N’ PEP.
        </p>

        {faqs.map((section) => (
          <div key={section.category} className="mt-12">
            <h2 className="text-xl font-black uppercase tracking-[0.08em] mb-4">{section.category}</h2>
            <div className="space-y-3">
              {section.questions.map((faq) => (
                <details key={faq.q} className="group dark-panel rounded-sm">
                  <summary className="cursor-pointer p-4 font-bold text-sm flex items-center justify-between gap-4 list-none">
                    {faq.q}
                    <svg
                      className="w-5 h-5 text-muted flex-shrink-0 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* Related links */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/coas"
            className="flex-1 p-4 dark-panel rounded-sm hover:border-primary/50 transition-colors text-center"
          >
            <p className="font-semibold text-sm">Certificates of Analysis</p>
            <p className="text-xs text-muted mt-1">Find laboratory reports and sample details</p>
          </Link>
          <Link
            href="/products"
            className="flex-1 p-4 dark-panel rounded-sm hover:border-primary/50 transition-colors text-center"
          >
            <p className="font-semibold text-sm">Browse Products</p>
            <p className="text-xs text-muted mt-1">View all compounds with pricing & specs</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
