// detail event
import React, { useRef, useEffect, useState, } from "react";

import { useParams } from "react-router-dom";
import Nav from "../section/Nav";
import Decouvrir from "../section/Decouvrir";
import Footer from "../section/Footer";
import { getEvenement_ID } from "../../backend/Event";
import { getArticlesLies } from "../../backend/Related";
import { Annee_affichage, Date_affichage } from "../detail/Date_timeline";
import "./Style.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Detail_event() {
  const { id } = useParams();
  const [evenement, setEvenement] = useState(null);
  const [articlesLies, setArticlesLies] = useState([]);

  useEffect(() => {
    getEvenement_ID(id)
      .then((data) => {
        setEvenement(data);
        return getArticlesLies(data.evenementsLies, data.portraitsLies);
      })
      .then(setArticlesLies)
      .catch((err) => console.error(err));
  }, [id]);

  




  // gsap //
// Références pour les éléments à animer
const textRef = useRef(null);

// convertit une URL YouTube classique (watch?v=, youtu.be/, shorts/...) en URL "embed"
// nécessaire car <iframe> a besoin du format /embed/ID pour intégrer le lecteur
function getYoutubeEmbedUrl(input) {
  if (!input) return null;

  // Si WordPress a enregistré un lien au format Markdown [titre](url),
  // on extrait uniquement l'URL entre parenthèses.
  const markdownMatch = input.match(/\(([^)]+)\)\s*$/);
  const rawUrl = markdownMatch ? markdownMatch[1] : input.trim();

  try {
    const parsed = new URL(rawUrl);
    let videoId = null;

    if (parsed.hostname.includes("youtu.be")) {
      // format court : https://youtu.be/VIDEO_ID
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/embed/")) {
        // déjà au bon format
        return rawUrl;
      } else if (parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/shorts/")[1];
      } else {
        // format classique : https://www.youtube.com/watch?v=VIDEO_ID
        videoId = parsed.searchParams.get("v");
      }
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    console.error("URL vidéo invalide reçue depuis WordPress :", input);
    return null; // URL invalide
  }
}

 // Animation GSAP
  useEffect(() => {
    if (!evenement) return; // on attend que les données soient chargées
    if (evenement.video) return; // pas de texte animé à afficher si on montre la vidéo

    const textElement = textRef.current;
    if (!textElement) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textElement,
        { y: 120,

         },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: textElement,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
            // markers: true, // à enlever en prod
          },
        }
      );
    }, textElement);
    return () => ctx.revert(); // cleanup pour React / StrictMode
  }, [evenement]); // dépend des données



if (!evenement) return null;

  return (
    <>
      <Nav />

      <header className="px-gx">
        <div className="mt-[3%] w-full flex items-end justify-between">
          <h1 className="text-titre w-9/12 text-grand leading-none font-gravitas m-0">
            {evenement.title}
          </h1>
          <h2 className="text-titre text-sous font-gravitas m-0">
            {Annee_affichage(evenement.debut)}
            {evenement.fin ? ` - ${Annee_affichage(evenement.fin)}` : ""}
          </h2>
        </div>
        <hr className="bg-sombre border-sombre h-[4px] mt-1"></hr>
      </header>

      {/* SECTION intro (paragraphe_1 = contenu principal WordPress) */}
      <section className="px-gx pt-[2vh]">
        <div
          className="columns-2 gap-40 my-[50px] text-txt font-merri font-extralight mb-[2vh]"
          dangerouslySetInnerHTML={{ __html: evenement.paragraphe_1 }}
        />
      </section>

      {/* SECTION paragraphe_2 + image, OU vidéo si WordPress en fournit une */}
      <section className="relative mt-[50px] h-[90vh] w-full">
        {evenement.videoUrl ? (
          // Lien YouTube → on convertit en URL "embed" et on affiche via iframe
          <iframe
            src={getYoutubeEmbedUrl(evenement.videoUrl)}
            title={evenement.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={evenement.image}
              alt={evenement.title}
              className="w-full h-full object-cover"
            />

            <p ref={textRef} className=" bg-clair font-merri text-txt font-extralight text-justify whitespace-pre-line 
            absolute bottom-0 right-[4%] w-3/5 py-6 px-10 z-10
            h-3/5 overflow-y-auto
            custom-scrollbar
            ">
              {evenement.paragraphe_2}
            </p>
          </>
        )}
      </section>

      {/* SECTION source */}
      {evenement.sources.length > 0 && (
        <section className="w-9/12 flex">
          <div className="bg-sombre w-full px-[10%] pr-[5%] py-[60px] flex-col content-end">
            <h3 className="text-clair text-sous font-gravitas text-4xl">Sources</h3>

            <div className="mx-[5%] mt-[30px] w-3/5">
              {evenement.sources.map((source, i) => (
                <div key={i} className="flex w-full justify-between my-6">
                  <p className="text-clair text-txt font-merri font-light">
                    {source.titre}
                  </p>
                  <a
                    href={source.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-titre text-txt font-gravitas cursor-pointer hover:underline"
                  >
                    Aller lire
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Decouvrir articles={articlesLies} />
      <Footer />
    </>
  );
}

export default Detail_event;