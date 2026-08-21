import { DateACF } from "../frontend/detail/DateTimeline";
import { ApiPortraits as ApiPortraits, ApiPortraitID, MediaID } from "./Api";

// si pas d'image contenu = vide
function getImage(item) {
  return item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
}

/*
  récupère tout les portrait formatés pour la timeline
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

/*
 récupère un seul portrait par son id formaté => détail
 */
export async function getPortraitID(id) {
  const p = await ApiPortraitID(id);

  const sources = [1, 2, 3, 4, 5]
    .map((n) => ({
      titre: p.acf[`source_${n}_titre`],
      lien: p.acf[`source_${n}_lien`],
    }))
    .filter((s) => s.titre && s.lien);

  // le champ Relationship ACF peut retourner des id simples ou soit des objet complets

  function Id(champ) {
    if (!champ) return [];
    return champ.map((item) => (typeof item === "object" ? item.ID || item.id : item));
  }

  // image_1 est un id d'attachment 
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