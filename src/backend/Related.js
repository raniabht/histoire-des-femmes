import { getEvenementID } from "./Event";
import { getPortraitID } from "./Portrait";

/**
 * récupère les articles liés par champs Relationship ACF,
 * jusqu'à 4 au total, triés du plus récent au plus ancien.
 */
export async function getArticlesLies(evenementsLiesIds = [], portraitsLiesIds = []) {

  // Si les 2tableaux d'id son vides on s'arrette
  if (evenementsLiesIds.length === 0 && portraitsLiesIds.length === 0) return [];

  
  

  // Lance tous les appels API
  // Promise.allSettled attend toute les requêtes
  // sans ça, UN SEUL échec ferait planter toute la récupération des articles liés
  const resultats = await Promise.allSettled([
  // "..." (spread)=> fusionne les deux listes de promesses en une seule
    ...evenementsLiesIds.map((id) => getEvenementID(id)),
    ...portraitsLiesIds.map((id) => getPortraitID(id)),
  ]);

  // ne garde que les résultats qui ont réussi ("fulfilled"),
  const articlesValides = resultats
    .filter((r) => r.status === "fulfilled")
  // extrait la vraie donnée de chaque résultat réussi
    .map((r) => r.value);

  // ne garde que ceux dont l'id était bien dans la liste des event liés,
  const evenementsAvecType = articlesValides
    .filter((a) => evenementsLiesIds.includes(a.id))
    .map((e) => ({ ...e, them: "event", rawId: e.id }));

  // la meme pour les portrait liés
  const portraitsAvecType = articlesValides
    .filter((a) => portraitsLiesIds.includes(a.id))
    .map((p) => ({ ...p, them: "portrait", rawId: p.id }));

  // fusionne les deux listes (événements + portraits) en un seul tableau
  const tousLesArticlesLies = [...evenementsAvecType, ...portraitsAvecType];


  // trie par date publié du plus recent et affiche max4
  return tousLesArticlesLies
    .sort((a, b) => new Date(b.datePublication || 0) - new Date(a.datePublication || 0))
    .slice(0, 4);
}


