// convertir => YYYY MM DD en => YYYY-MM-DD
export function DateACF(dateStr) {
  if (!dateStr || dateStr.length !== 8) return null;
  const annee = dateStr.slice(0, 4);
  const mois = dateStr.slice(4, 6);
  const jour = dateStr.slice(6, 8);
  return `${annee}-${mois}-${jour}`;
}

// convertit => "YYYY-MM-DD" => "JJ/MM/AAAA"
export function DateAffichage(dateISO) {
  if (!dateISO) return "";
  const [annee, mois, jour] = dateISO.split("-");
  return `${jour}/${mois}/${annee}`;
}


// prend uniquement l'année
export function AnneeAffichage(dateISO) {
  if (!dateISO) return "";
  return dateISO.split("-")[0];
}