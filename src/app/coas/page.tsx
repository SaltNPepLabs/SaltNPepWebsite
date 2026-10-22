import { coaLibrary } from "@/lib/coa-library";
import { CoaBrowser } from "./coa-browser";
export const metadata = { title: "COA library | SALT N’ PEP", description: "Browse published laboratory certificates by compound and report source." };
export default function Page() { return <CoaBrowser records={coaLibrary} />; }
