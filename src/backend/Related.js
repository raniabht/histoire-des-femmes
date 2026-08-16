import { getEvenementID } from "./Event";
import { getPortraitID } from "./Portrait";

/**
 * Récupère les articles liés MANUELLEMENT (champs Relationship ACF),
 * jusqu'à 4 au total, triés du plus récent au plus ancien.
 *
 * @param {number[]} evenementsLiesIds - IDs des événements liés
 * @param {number[]} portraitsLiesIds - IDs des portraits liés
 */
export async function getArticlesLies(evenementsLiesIds = [], portraitsLiesIds = []) {
  if (evenementsLiesIds.length === 0 && portraitsLiesIds.length === 0) return [];

  const [evenementsComplets, portraitsComplets] = await Promise.all([
    Promise.all(evenementsLiesIds.map((id) => getEvenementID(id))),
    Promise.all(portraitsLiesIds.map((id) => getPortraitID(id))),
  ]);

  // On ajoute un champ "them" pour que le composant Decouvrir sache
  // vers quelle page rediriger (getEvenementById/getPortraitById ne le renvoient pas)
  const evenementsAvecType = evenementsComplets.map((e) => ({ ...e, them: "event", rawId: e.id }));
  const portraitsAvecType = portraitsComplets.map((p) => ({ ...p, them: "portrait", rawId: p.id }));

  const tousLesArticlesLies = [...evenementsAvecType, ...portraitsAvecType];

  // Trie par date de publication WordPress la plus récente en premier,
  // puis limite à 4 résultats
  return tousLesArticlesLies
    .sort((a, b) => new Date(b.datePublication || 0) - new Date(a.datePublication || 0))
    .slice(0, 4);
}