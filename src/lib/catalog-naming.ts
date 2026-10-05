// Public catalog wording is separate from source records and persisted order IDs.
export function catalogSlug(slug: string): string {
  return slug === "retatrutide" ? "glp-3" : slug;
}

export function catalogText(text: string): string {
  return text.replace(/retatrutide/gi, "GLP-3");
}

// Research snapshots retain original wording for reproducible source checks.
// Apply catalog naming only to the public copy, including its route keys.
export function catalogWording<T>(value: T): T {
  if (typeof value === "string") return catalogText(value) as T;
  if (Array.isArray(value)) return value.map(catalogWording) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [
      catalogSlug(key),
      key === "slug" && typeof item === "string" ? catalogSlug(item) : catalogWording(item),
    ])) as T;
  }
  return value;
}

export const catalogNamingNote = "GLP-3 is our catalog label for LY-3437943. Study titles and summaries use this label in place of the source's compound name. Linked publications retain their original wording.";
