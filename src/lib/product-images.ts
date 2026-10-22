// Photo amounts must match catalog variants. Preserve original photos where already correct.
type PhotoSet = { photos: Record<string, string>; isolated: Record<string, string> };
export const productImages: Record<string, PhotoSet> = {
  "melanotan-i": {"photos": {"10mg": "/images/catalog/melanotan-i-10mg-rock.png"}, "isolated": {"10mg": "/images/catalog/melanotan-i-10mg-isolated.png"}},
  "selank": {"photos": {"5mg": "/images/catalog/selank-5mg-rock.png", "10mg": "/images/catalog/selank-10mg-rock.png"}, "isolated": {"5mg": "/images/catalog/selank-5mg-isolated.png"}},
  "semax": {"photos": {"5mg": "/images/catalog/semax-5mg-rock.png", "10mg": "/images/catalog/semax-10mg-rock.png"}, "isolated": {"5mg": "/images/catalog/semax-5mg-isolated.png"}},
  "cjc-1295-dac": {"photos": {"5mg": "/images/catalog/cjc-1295-dac-5mg-rock.png"}, "isolated": {"5mg": "/images/catalog/cjc-1295-dac-5mg-isolated.png"}},
  "cjc-1295-no-dac": {"photos": {"5mg": "/images/catalog/cjc-1295-no-dac-5mg-rock.png"}, "isolated": {"5mg": "/images/catalog/cjc-1295-no-dac-5mg-isolated.png"}},
  "ipamorelin": {"photos": {"5mg": "/images/catalog/ipamorelin-5mg-rock.png"}, "isolated": {"5mg": "/images/catalog/ipamorelin-5mg-isolated.png"}},
  "igf-1-lr3": {"photos": {"1mg": "/images/catalog/igf-1-lr3-1mg-rock.png"}, "isolated": {"1mg": "/images/catalog/igf-1-lr3-1mg-isolated.png"}},
  "tesamorelin": {"photos": {"5mg": "/images/catalog/tesamorelin-5mg-rock.png", "10mg": "/images/catalog/tesamorelin-10mg-rock.png", "20mg": "/images/catalog/tesamorelin-20mg-rock.png"}, "isolated": {"5mg": "/images/catalog/tesamorelin-5mg-isolated.png"}},
  "glp-2-tz": {"photos": {"10mg": "/images/catalog/glp-2-tz-10mg-rock.png", "30mg": "/images/catalog/glp-2-tz-30mg-rock.png"}, "isolated": {"10mg": "/images/catalog/glp-2-tz-10mg-isolated.png"}},
  "glp-1-sm": {"photos": {"10mg": "/images/catalog/glp-1-sm-10mg-rock.png", "30mg": "/images/catalog/glp-1-sm-30mg-rock.png"}, "isolated": {"10mg": "/images/catalog/glp-1-sm-10mg-isolated.png"}},
  "kpv": {"photos": {"10mg": "/images/catalog/kpv-10mg-rock.png", "30mg": "/images/catalog/kpv-30mg-rock.png"}, "isolated": {"10mg": "/images/catalog/kpv-10mg-isolated.png"}},
  "bacteriostatic-water": {"photos": {"10mL": "/images/catalog/bacteriostatic-water-10mL-rock.png"}, "isolated": {"10mL": "/images/catalog/bacteriostatic-water-10mL-isolated.png"}},
  "nad-plus": {"photos": {"500mg": "/images/catalog/nad-plus-500mg-rock.png"}, "isolated": {"500mg": "/images/catalog/nad-plus-500mg-isolated.png"}},
  "glutathione": {"photos": {"1500mg": "/images/catalog/glutathione-1500mg-rock.png"}, "isolated": {"1500mg": "/images/catalog/glutathione-1500mg-isolated.png"}},
  "klow": {"photos": {"80mg": "/images/catalog/klow-80mg-rock.png"}, "isolated": {"80mg": "/images/catalog/klow-80mg-isolated.png"}},
  "ss-31": {"photos": {"10mg": "/images/catalog/ss-31-10mg-rock.png"}, "isolated": {"10mg": "/images/catalog/ss-31-10mg-isolated.png"}},
  "ara-290": {"photos": {"10mg": "/images/catalog/ara-290-10mg-rock.png"}, "isolated": {"10mg": "/images/catalog/ara-290-10mg-isolated.png"}},
  "wolverine": {"photos": {"20mg": "/images/catalog/wolverine-20mg-rock.png"}, "isolated": {"20mg": "/images/catalog/wolverine-20mg-isolated.png"}},
  "cagrilintide": {"photos": {"10mg": "/images/catalog/cagrilintide-10mg-rock.png"}, "isolated": {"10mg": "/images/catalog/cagrilintide-10mg-isolated.png"}},
  "kisspeptin": {"photos": {"10mg": "/images/catalog/kisspeptin-10mg-rock.png"}, "isolated": {"10mg": "/images/catalog/kisspeptin-10mg-isolated.png"}},
  "bpc-157": { photos: { "10mg": "/images/sizes/bpc-157-10mg.png", "30mg": "/images/sizes/bpc-157-30mg.png" }, isolated: { "10mg": "/images/sizes/bpc-157-10mg-isolated.png" } },
  retatrutide: { photos: { "10mg": "/images/GLP-3-10mg.png", "30mg": "/images/sizes/glp-3-30mg.png" }, isolated: { "10mg": "/images/vials/glp-3.png", "30mg": "/images/vials/glp-3-30mg-neutral.png" } },
  "tb-500": { photos: { "10mg": "/images/TB-500-10mg.png", "30mg": "/images/sizes/tb-500-30mg.png" }, isolated: { "10mg": "/images/vials/tb-500.png" } },
  "mt-2": { photos: { "10mg": "/images/MT-2-10mg.png" }, isolated: { "10mg": "/images/vials/mt-2.png" } },
  "mots-c": { photos: { "10mg": "/images/MOTS-c-10mg.png", "40mg": "/images/sizes/mots-c-40mg.png" }, isolated: { "10mg": "/images/vials/mots-c.png" } },
  pinealon: { photos: { "5mg": "/images/sizes/pinealon-5mg.png", "10mg": "/images/sizes/pinealon-10mg.png", "20mg": "/images/Pinealon-20mg.png" }, isolated: { "10mg": "/images/sizes/pinealon-10mg-isolated.png", "20mg": "/images/vials/pinealon.png" } },
  epitalon: { photos: { "10mg": "/images/Epitalon-10mg.png", "50mg": "/images/sizes/epitalon-50mg.png" }, isolated: { "10mg": "/images/vials/epitalon.png" } },
  "ghk-cu": { photos: { "50mg": "/images/GHK-Cu-50mg.png", "100mg": "/images/sizes/ghk-cu-100mg.png" }, isolated: { "50mg": "/images/vials/ghk-cu.png" } },
};

export function getProductImage(slug: string, dosage: string, isolated = false): string | undefined {
  const images = productImages[slug];
  return (isolated ? images?.isolated[dosage] : undefined) ?? images?.photos[dosage];
}
