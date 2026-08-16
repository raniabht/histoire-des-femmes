import { fetchCategories } from "./Api";

/**
 * Récupère toutes les catégories créées dans WordPress,
 * formatées simplement pour l'affichage des boutons
 */
export async function getCategories() {
  const categories = await fetchCategories();

  return categories.map((cat) => ({
    id: cat.id,
    nom: cat.name,
    slug: cat.slug,
  }));
}

/**
 * Filtre un tableau d'articles (events + portraits) selon une catégorie.
 * Si categorieId est vide/null, retourne tout sans filtrer.
 */
export function filtrerParCategorie(items, categorieId) {
  if (!categorieId) return items;
  return items.filter((item) => item.categories?.includes(Number(categorieId)));
}