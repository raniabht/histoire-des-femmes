import Nav from "../section/Nav";
import { useEffect, useRef, useState } from "react";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import { DataSet } from "vis-data";
import { fetchEvenements, fetchPortraits } from "../api";
import "./Style.css";

function parseDateACF(dateStr) {
  if (!dateStr || dateStr.length !== 8) return null;
  const annee = dateStr.slice(0, 4);
  const mois = dateStr.slice(4, 6);
  const jour = dateStr.slice(6, 8);
  return `${annee}-${mois}-${jour}`;
}

function formatDateAffichage(dateISO) {
  if (!dateISO) return "";
  const [annee, mois, jour] = dateISO.split("-");
  return `${jour}/${mois}/${annee}`;
}

function getFeaturedImage(item) {
  return item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
}

export default function YearTimeline() {
  const containerRef = useRef(null);
  const [anneeAffichee, setAnneeAffichee] = useState(1800);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function chargerDonnees() {
      try {
        const [evenements, portraits] = await Promise.all([
          fetchEvenements(),
          fetchPortraits(),
        ]);

        const evenementsFormates = evenements
          .filter((evt) => evt.acf && evt.acf.debut)
          .map((evt) => ({
            id: `event-${evt.id}`,
            title: evt.title.rendered,
            start: parseDateACF(evt.acf.debut),
            end: evt.acf.fin ? parseDateACF(evt.acf.fin) : "",
            image: getFeaturedImage(evt),
            them: "event",
          }));

        const portraitsFormates = portraits
          .filter((p) => p.acf && !Array.isArray(p.acf) && p.acf.debut)
          .map((p) => ({
            id: `portrait-${p.id}`,
            title: p.title.rendered,
            nom: p.acf.nom,
            prenom: p.acf.prenom,
            start: parseDateACF(p.acf.debut),
            end: p.acf.fin ? parseDateACF(p.acf.fin) : "",
            image: getFeaturedImage(p),
            them: "portrait",
          }));

        setItems([...evenementsFormates, ...portraitsFormates]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    chargerDonnees();
  }, []);

  useEffect(() => {
    if (loading || items.length === 0) return;

    const cart = new DataSet(
      items.map((item) => {

        let content;

        if (item.them === "event") {
          content = `
            <a href="#">
              <div class="custom-card-content border-t-[4px] border-l-[4px] border-sombre">
                <h3 class="custom-card-title">${item.title}</h3>
                <p class="custom-card-period">${formatDateAffichage(item.start)}${item.end ? " - " + formatDateAffichage(item.end) : ""}</p>
              </div>
              <img class="custom-card-bg" src="${item.image}" alt="${item.title}" />
            </a>
          `;
        } else if (item.them === "portrait") {
          content = `
            <a href="#" class="custom-card-link">
              <div>
                <h3 class="custom-card-title">${item.prenom} <br/> ${item.nom}</h3>
              </div>
              <div>
                <img class="custom-card-bg" src="${item.image}" alt="${item.title}" />
              </div>
            </a>
          `;
        }

        return {
          id: item.id,
          start: item.start,
          margin: { item: 20 },
          content: content,
        };
      })
    );

    // ... reste identique (lgt, timeline, etc.)
  }, [items, loading]);

  // ... reste identique
}

  return (
    <>
      <Nav />
      <div className="relative h-[90vh]">
        <div className="fixed top-[8%] px-gx text-titre font-bold text-[10vw] font-gravitas opacity-60 h-0">
          {anneeAffichee}
        </div>

        {loading ? (
          <p className="pt-[40vh] text-center">Chargement de la timeline...</p>
        ) : (
          <div ref={containerRef} className="h-full w-full" />
        )}
      </div>
    </>
  );
}