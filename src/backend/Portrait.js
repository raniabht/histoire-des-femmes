import { DateACF } from "../frontend/detail/DateTimeline";
import { ApiPortraits as ApiPortraits, ApiPortraitID, MediaID } from "./Api";

function getImage(item) {
  return item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
}

/**
 * Récupère TOUS les portraits, formatés pour la timeline
 */
export async function getPortraits() {
  const portraits = await ApiPortraits();

  return portraits
    .filter((p) => p.acf && !Array.isArray(p.acf) && p.acf.naissance)
    .map((p) => ({
      id: `portrait-${p.id}`,
      rawId: p.id,
      title: p.title.rendered,
      excerpt: p.excerpt.rendered,
      nom: p.acf.nom,
      prenom: p.acf.prenom,
      nationalite: p.acf.nationalite,
      metiers: p.acf.metiers,
      start: DateACF(p.acf.naissance),
      end: p.acf.deces ? DateACF(p.acf.deces) : "",
      image: getImage(p),
      them: "portrait",
      datePublication: p.date,
      alaUne: p.acf.a_la_une === true,
      categories: p.categories || [],
    }));
}

/**
 * Récupère UN SEUL portrait par son ID, formaté pour la page détail
 */
export async function getPortraitID(id) {
  const p = await ApiPortraitID(id);

  const sources = [1, 2, 3, 4, 5]
    .map((n) => ({
      titre: p.acf[`source_${n}_titre`],
      lien: p.acf[`source_${n}_lien`],
    }))
    .filter((s) => s.titre && s.lien);

  // Le champ Relationship ACF peut retourner soit des IDs simples,
  // soit des objets complets selon le "Return format" choisi dans ACF
  function Id(champ) {
    if (!champ) return [];
    return champ.map((item) => (typeof item === "object" ? item.ID || item.id : item));
  }

  // image_1 est un ID d'attachment (pas une URL) — il faut le résoudre séparément
  const image1 = p.acf.image_1 ? await MediaID (p.acf.image_1) : null;

  return {
    id: p.id,
    title: p.title.rendered,
    nom: p.acf.nom,
    prenom: p.acf.prenom,
    naissance: DateACF(p.acf.naissance),
    deces: p.acf.deces ? DateACF(p.acf.deces) : "",
    nationalite: p.acf.nationalite,
    metiers: p.acf.metiers,
    paragraphe_1: p.content.rendered,
    paragraphe_2: p.acf.paragraphe_2,
    image: getImage(p),
    image1: image1?.source_url || null,
    videoUrl: p.acf.media_video || null,
    sources,
    categories: p.categories || [],
    evenementsLies: Id(p.acf.evenements_lies),
    portraitsLies: Id(p.acf.portraits_lies),
    datePublication: p.date,
  };
}