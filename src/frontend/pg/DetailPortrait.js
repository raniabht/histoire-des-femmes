import React, { useRef, useEffect, useState, } from "react";

import { useParams } from "react-router-dom";
import Nav from "../section/Nav";
import Decouvrir from "../section/Decouvrir";
import Footer from "../section/Footer";
import { getPortraitID } from "../../backend/Portrait";
import { getArticlesLies } from "../../backend/Related";
import { DateAffichage } from "../detail/DateTimeline";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function DetailPortrait() {
  const { id } = useParams();
  const [portrait, setPortrait] = useState(null);
  const [articlesLies, setArticlesLies] = useState([]);

  useEffect(() => {
  // récup le portrait par id
  getPortraitID(id)
    .then((data) => {
      // enregistre les données du portrait
      setPortrait(data);
      // récup les articles liés au portrait
      return getArticlesLies(data.evenementsLies, data.portraitsLies);
    })
    .then(setArticlesLies) // Enregistre les articles liés
    .catch((err) => console.error(err)); // Affiche l'erreur
}, [id]); // Relance si l'ID change



// gsap //
// références pour les éléments à animer
const txt = useRef(null);
const parent = useRef(null);

/// Animation GSAP
useEffect(() => {
  if (!txt.current) return;
  if (!parent.current) return;

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: txt.current,
      start: "bottom 95%",
      endTrigger: parent.current,
      end: "bottom 100%",
      pin: txt.current,
      // markers: true,
    });
  }, txt);

  return () => ctx.revert();
}, [portrait]); // ← se relance quand portrait passe de null à un objet








  if (!portrait) return null;

  return (
    <>
      <Nav />

      <header className="h-[83vh] bg-sombre">
        <div className="w-full h-full flex items-end justify-between bg-cover bg-center"
        style={portrait.image1 ? { backgroundImage: `url(${portrait.image1})` } : undefined}
        >
          <h1 className="px-gx text-en leading-none font-gravitas text-titre">
            {portrait.prenom} <br />
            {portrait.nom}
          </h1>
          <div className="w-5/12 h-full flex items-end">
            <img
              src={portrait.image}
              alt={`${portrait.prenom} ${portrait.nom}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* SECTION info et intro */}
      <section className="px-gx pt-[2vh]">
        <div>
          <div className="flex justify-between">
            <p className="text-txt font-merri font-normal">
              Naissance: {DateAffichage(portrait.naissance)}
            </p>
            <p className="text-txt font-merri font-normal">
              Mort: {portrait.deces ? DateAffichage(portrait.deces) : ""}
            </p>
            <p className="text-txt font-merri font-normal">
              Nationalité: {portrait.nationalite}
            </p>
            <p className="text-txt font-merri font-normal">
              Métiers: {portrait.metiers}
            </p>
          </div>

          <div className="bg-black border-black h-[4px] w-full mt-1"></div>

          {/* intro article (paragraphe_1 = contenu principal WordPress) */}
          <div
            className="columns-2 gap-40 my-[50px] text-txt font-merri font-extralight mb-[2vh]"
            dangerouslySetInnerHTML={{ __html: portrait.paragraphe_1 }}
          />
        </div>
      </section>

      {/* SECTION txt et source */}
      <section className="my-[100px] w-full flex">
        {/* txt (paragraphe_2) */}
        <p className="w-7/12 ml-gx mr-gx text-txt font-merri font-light whitespace-pre-line">
          {portrait.paragraphe_2}
        </p>

        {/* SOURCE */}
        {portrait.sources.length > 0 && (
          <div ref={parent} className=" bg-sombre w-6/12 px-[2%] pr-[5%] py-[40px]">
            <div ref={txt} className=" flex-col ">
            <h3 className="text-sous text-clair font-gravitas text-4xl">Sources</h3>

            <div className="mx-[2%] mt-[30px] w-full">
              {portrait.sources.map((source, i) => (
                <div key={i} className="flex w-full justify-between my-4">
                  <p className="text-txt text-clair font-merri font-light">
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
           </div>
        )}
      </section>

      <Decouvrir articles={articlesLies} />
      <Footer />
    </>
  );
}

export default DetailPortrait;