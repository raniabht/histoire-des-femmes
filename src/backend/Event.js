import { DateACF } from "../frontend/detail/DateTimeline";
import { ApiEvenements as ApiEvenements, ApiEvenementID } from "./Api";


function getImage(item) {
  return item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
}

/**
 * Récupère TOUS les événements, formatés pour la timeline
 */
export async function getEvenements() {
  const evenements = await ApiEvenements();

  return evenements
    .filter((evt) => evt.acf && evt.acf.debut)
    .map((evt) => ({
      id: `event-${evt.id}`,
      rawId: evt.id,
      title: evt.title.rendered,
      excerpt: evt.excerpt.rendered,
      start: DateACF(evt.acf.debut),
      end: evt.acf.fin ? DateACF(evt.acf.fin) : "",
      image: getImage(evt),
      them: "event",
      datePublication: evt.date,
      alaUne: evt.acf.une === true,
      categories: evt.categories || [],
    }));
}

/**
 * Récupère UN SEUL événement par son ID, formaté pour la page détail
 */
export async function getEvenementID(id) {
  const evt = await ApiEvenementID(id);

  // Récupère les 5 sources non vides
  const sources = [1, 2, 3, 4, 5]
    .map((n) => ({
      titre: evt.acf[`source_${n}_titre`],
      lien: evt.acf[`source_${n}_lien`],
    }))
    .filter((s) => s.titre && s.lien);

  // Le champ Relationship ACF peut retourner soit des IDs simples,
  // soit des objets complets selon le "Return format" choisi dans ACF —
  // on gère les deux cas pour être sûr d'extraire un simple ID numérique
  function Id(champ) {
    if (!champ) return [];
    return champ.map((item) => (typeof item === "object" ? item.ID || item.id : item));
  }

  return {
    id: evt.id,
    title: evt.title.rendered,
    debut: DateACF(evt.acf.debut),
    fin: evt.acf.fin ? DateACF(evt.acf.fin) : "",
    paragraphe_1: evt.content.rendered, // le contenu principal WordPress
    paragraphe_2: evt.acf.paragraphe_2,
    image: getImage(evt),
    videoUrl: evt.acf.video || null,
    sources,
    categories: evt.categories || [],
    evenementsLies: Id(evt.acf.evenements_lies),
    portraitsLies: Id(evt.acf.portraits_lies),
    datePublication: evt.date,
  };
}