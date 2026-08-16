// timeline.js
import Nav from "../section/Nav";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import { DataSet } from "vis-data";
import { getEvenements } from "../../backend/Event";
import { getPortraits } from "../../backend/Portrait";
import { Cart } from "../detail/Cart_timeline";
import "./Style.css";
import Menu from "../section/menu";

export default function YearTimeline() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [conteur, setConteur] = useState();
  const [loading, setLoading] = useState(true);

  // récupérer et formater les données WordPress
  useEffect(() => {
    async function chargerDonnees() {

      // recuprair les 2 api
      try {
        const [evenementsFormates, portraitsFormates] = await Promise.all([
          getEvenements(),
          getPortraits(),
        ]);

        // fusion des tableau event et portrait
        setItems([...evenementsFormates, ...portraitsFormates]);
      } catch (err) {
        console.error(err);
      } finally {
        // Une fois les données arrivées (ou en erreur), on arrête le chargement
        setLoading(false);
      }
    }

    chargerDonnees();
  }, []);

  // création timeline une fois données chargées
  useEffect(() => {
    // Tant que ça charge, ou si aucun item n'est disponible, on ne construit pas la timeline
    if (loading || items.length === 0) return;

    // Transforme les données item du tableau en un objet
    const cart = new DataSet(
      items.map((item) => ({
        id: item.id,
        start: item.start,
        content: Cart(item),
      }))
    );

    // limite de la timline guauche
    const datesValides = items
      .map((item) => item.start)
      .filter((start) => start)
      .map((start) => new Date(start));

    // trouve la date la plus ancienne du tableau

    const dateMin = datesValides.length > 0 // => condition
      ? new Date(Math.min(...datesValides))  // => si vrais
      // date de secoure
      : new Date(1800, 0, 1); // => si faux

    // limite de la timline droit aujourd'hui + 25 ans
    const dateLimite = new Date();
    // setFullYear => extrait l'année
    dateLimite.setFullYear(dateLimite.getFullYear() + 25);

    // parcoure tout le tableau pour touver l'article le plus recent
    const itemRecent = items.reduce((plusRecent, item) => {
      if (!item.datePublication) return plusRecent; // l'article a une date, on continue
      if (!plusRecent) return item;
      // si la valeur de l'article analiser est plus grand que celle d'avant on change
      return new Date(item.datePublication) > new Date(plusRecent.datePublication) // => condition
        ? item // => si vrais
        : plusRecent; // => si faux
    }, null);

    // recupere l'info de la date dans l'article stocker dans itemRecent
    const dateCentre = itemRecent
      ? new Date(itemRecent.start)
      : new Date();

    // Fenêtre de vue initiale : centrée sur cet article,
    const centre = 1000 * 60 * 60 * 24 * 365 * 5;
    const startVue = new Date(dateCentre.getTime() - centre);
    const endVue = new Date(dateCentre.getTime() + centre);

    // config la timline
    const lgt = {
      timeAxis: { scale: "year", step: 10 },
      align: "left",
      height: "100%",
      orientation: { axis: "bottom", item: "bottom" },
      horizontalScroll: true,
      zoomKey: "ctrlKey",
      min: dateMin,
      max: dateLimite,
      start: startVue,
      end: endVue,
      zoomMin: 1000 * 60 * 60 * 24 * 365 * 60,
      zoomMax: 1000 * 60 * 60 * 24 * 365 * 110,
      // cart qui se chevauche
      stack: true,
      // contenu label année
      format: {
        minorLabels: { year: "Y" },
      },
    };

    const timeline = new Timeline(containerRef.current, cart, lgt);

    // Force le compteur à s'afficher dès le chargement, sans attendre un déplacement
    const anneeInitiale = startVue.getFullYear();
    const siecleInitial = Math.floor(anneeInitiale / 100) * 100;
    setConteur(siecleInitial);


    // rangechange = l'évènement de Vis.js declancher par le mouvement/zoom dans la TL
    timeline.on("rangechange", (props) => {
      // recup la date la plus a gauche
      const annee = props.start.getFullYear();
      // calcule pour avoir le siecle (floor => arondi)
      const siecle = Math.floor(annee / 100) * 100;
      setConteur(siecle);
    });

    // Recalcule proprement l'empilement une fois que les polices web ont chargé
    document.fonts.ready.then(() => {
      // redraw recalcule tout le visuelle avec la typo cette fois
      timeline.redraw();
      setLoading(false); // ← ici, pas avant
    });

    const handleResize = () => timeline.redraw();
    window.addEventListener("resize", handleResize);

    // Navigation au clic sur une carte : redirige vers la bonne page détail
    timeline.on("click", (props) => {
      if (!props.item) return; // clic dans le vide, on ignore

      const itemData = items.find((i) => i.id === props.item);
      if (!itemData) return;

      // itemData.id vaut "event-42" ou "portrait-49" → on extrait l'id réel
      const realId = itemData.id.replace(/^(event|portrait)-/, "");

      // condition pour envoyer a la bonne page
      if (itemData.them === "event") {
        navigate(`/evenement/${realId}`);
      } else if (itemData.them === "portrait") {
        navigate(`/portrait/${realId}`);
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      timeline.destroy();
    };
  }, [items, loading, navigate]);

  return (
    <>
      <Nav />
      <div className="h-[91vh]">
        {loading ? (
          <p className="pt-[40vh] text-center">Chargement de la timeline...</p>
        ) : (
          <>
            <div ref={containerRef} className="h-full w-full" />
            {/* <Menu/> */}
            <div className="fixed top-[8%] px-gx text-titre font-bold text-[8vw] font-gravitas opacity-60">
              {conteur}
            </div>
          </>
        )}
      </div>
    </>
  );
}