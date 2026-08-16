const URL = "http://localhost/cms-tfe/wp-json/wp/v2";

export async function ApiEvenements() {
  const res = await fetch(`${URL}/evenements?per_page=100&_embed`);
  if (!res.ok) throw new Error(`Erreur événements : ${res.status}`);
  return res.json();
}

export async function ApiPortraits() {
  const res = await fetch(`${URL}/portraits?per_page=100&_embed`);
  if (!res.ok) throw new Error(`Erreur portraits : ${res.status}`);
  return res.json();
}

// recup id event
export async function ApiEvenementID(id) {
  const res = await fetch(`${URL}/evenements/${id}?_embed`);
  if (!res.ok) throw new Error(`Erreur événement ${id} : ${res.status}`);
  return res.json();
}

// recup id portrait
export async function ApiPortraitID(id) {
  const res = await fetch(`${URL}/portraits/${id}?_embed`);
  if (!res.ok) throw new Error(`Erreur portrait ${id} : ${res.status}`);
  return res.json();
}

// recup video event
export async function MediaID(id) {
  if (!id) return null;
  const res = await fetch(`${URL}/media/${id}`);
  if (!res.ok) throw new Error(`Erreur média ${id} : ${res.status}`);
  return res.json();
}

