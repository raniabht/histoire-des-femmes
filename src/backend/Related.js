import { getEvenementID } from "./Event";
import { getPortraitID } from "./Portrait";

/**
 * récupère les articles liés MANUELLEMENT (champs Relationship ACF),
 * jusqu'à 4 au total, triés du plus récent au plus ancien.
 */
export async function getArticlesLies(evenementsLiesIds = [], portraitsLiesIds = []) {
  if (evenementsLiesIds.length === 0 && portraitsLiesIds.length === 0) return [];

  const [evenementsComplets, portraitsComplets] = await Promise.all([
    Promise.all(evenementsLiesIds.map((id) => getEvenementID(id))),
    Promise.all(portraitsLiesIds.map((id) => getPortraitID(id))),
  ]);

  // on ajoute un champ "them" pour que le composant Decouvrir sache
  // vers quelle page rediriger
  const evenementsAvecType = evenementsComplets.map((e) => ({ ...e, them: "event", rawId: e.id }));
  const portraitsAvecType = portraitsComplets.map((p) => ({ ...p, them: "portrait", rawId: p.id }));

  const tousLesArticlesLies = [...evenementsAvecType, ...portraitsAvecType];

  // trie par date de publication wordpress la plus récente en premier,
  // puis limite à 4 résultats
  return tousLesArticlesLies
    .sort((a, b) => new Date(b.datePublication || 0) - new Date(a.datePublication || 0))
    .slice(0, 4);
}