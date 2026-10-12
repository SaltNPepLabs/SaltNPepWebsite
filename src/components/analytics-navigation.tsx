"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview, track } from "@/lib/analytics";

export function AnalyticsNavigation() {
  const pathname = usePathname();
  const params = useSearchParams().toString();
  const lastReader = useRef("");
  useEffect(() => { pageview(`${pathname}${params ? `?${params}` : ""}`); }, [pathname, params]);
  useEffect(() => {
    const paper = /^\/science\/([a-z0-9-]+)\/(\d+)$/.exec(pathname);
    if (paper && lastReader.current !== pathname) track("research_paper_opened", { compound_slug: paper[1], pmid: paper[2] });
    lastReader.current = pathname;
  }, [pathname]);
  useEffect(() => {
    function outbound(event: MouseEvent) {
      if (event.defaultPrevented || (event.type === "auxclick" && event.button !== 1)) return;
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href);
      const product = anchor.dataset.analyticsProduct || /^\/(?:products|science)\/([^/]+)/.exec(window.location.pathname)?.[1];
      if (/\.pdf$/i.test(url.pathname)) track("outbound_click", { type: "certificate_pdf", product_slug: product });
      else if (["pubmed.ncbi.nlm.nih.gov", "pmc.ncbi.nlm.nih.gov"].includes(url.hostname)) {
        track("outbound_click", { type: "pubmed", pmid: anchor.dataset.analyticsPmid || /^\/(\d+)\/?$/.exec(url.pathname)?.[1], product_slug: product });
      }
    }
    document.addEventListener("click", outbound);
    document.addEventListener("auxclick", outbound);
    return () => { document.removeEventListener("click", outbound); document.removeEventListener("auxclick", outbound); };
  }, []);
  return null;
}
