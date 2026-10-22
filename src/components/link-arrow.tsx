export function LinkArrow({ diagonal = false }: { diagonal?: boolean }) {
 return <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{display:"inline-block",verticalAlign:"middle",flexShrink:0}}><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"}/></svg>;
}
