"""Render unchanged COA PDFs into browser-readable pages; retain original downloads."""
import html, json, re, subprocess
from pathlib import Path
root = Path(__file__).resolve().parents[1]
mapping = json.loads((root / 'src/lib/coa-downloads.json').read_text())
for url in sorted(set(mapping.values())):
    pdf = root / 'public' / url.lstrip('/')
    folder = pdf.with_suffix('')
    folder.mkdir(exist_ok=True)
    subprocess.run(['pdftoppm', '-r', '140', '-jpeg', '-jpegopt', 'quality=90', str(pdf), str(folder / 'page')], check=True, capture_output=True)
    pages = sorted(folder.glob('page-*.jpg'), key=lambda p:int(re.search(r'(\d+)\.jpg$',p.name)[1]))
    text = subprocess.run(['/Users/jonahsparks/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/poppler/bin/pdftotext', '-layout', str(pdf), '-'],check=True,capture_output=True,text=True).stdout
    images = ''.join(f'<figure><img src="{folder.name}/{p.name}" alt="Certificate of Analysis, page {i}" loading="lazy"><figcaption>Page {i} of {len(pages)}</figcaption></figure>' for i,p in enumerate(pages,1))
    page = '''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Certificate of Analysis | SALT N’ PEP</title><style>*{box-sizing:border-box}body{margin:0;background:#ede9e2;color:#282724;font:15px Arial,sans-serif}header{padding:22px max(20px,calc((100% - 1000px)/2));background:#252525;color:#f5f0e7}nav{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}a{color:inherit;text-underline-offset:4px}h1{font-size:23px;font-weight:400;margin:20px 0 8px}header p{font-size:12px;color:#ccc5ba;margin:0;line-height:1.6}main{max-width:1040px;margin:24px auto;padding:0 16px}figure{margin:0 0 25px}img{width:100%;height:auto;display:block;background:white}figcaption{font-size:12px;color:#686158;text-align:center;margin-top:8px}details{margin:25px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px}a:focus-visible,summary:focus-visible{outline:2px solid #b89861;outline-offset:5px}</style><header><nav><a href="/coas">SALT N’ PEP · COA library</a><a href="PDF" download>Download original PDF ↓</a></nav><h1>Certificate of Analysis</h1><p>All report pages are shown below. Download the original PDF for the source document.</p></header><main>IMAGES<details><summary>Report text</summary><pre>TEXT</pre></details></main></html>'''
    pdf.with_suffix('.html').write_text(page.replace('PDF"', pdf.name+'"').replace('IMAGES',images).replace('TEXT',html.escape(text)))
print(f'Rendered {len(set(mapping.values()))} complete reports.')
