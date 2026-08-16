import React, { useRef, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Nav from "../section/Nav"
import Footer from "../section/Footer"
import Cart_portrait from "../detail/CartPortrait"
import Cart_event from "../detail/CartEvent"
import Form from "../section/Form"
import { getEvenements } from "../../backend/Event"
import { getPortraits } from "../../backend/Portrait"
import { Date_affichage, Annee_affichage } from "../detail/DateTimeline"

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Accueil_av() {
  const [dernierArticle, setDernierArticle] = useState(null)
  const [portraitsALaUne, setPortraitsALaUne] = useState([])
  const [evenementsALaUne, setEvenementsALaUne] = useState([]);


  useEffect(() => {
    async function chargerDonnees() {
      try {
        const [evenements, portraits] = await Promise.all([
          getEvenements(),
          getPortraits(),
        ])

        const Articles = [...evenements, ...portraits]

        // Le dernier article publié sur WordPress (event OU portrait), toutes dates confondues
        const dernier = Articles.reduce((plusRecent, item) => {
          if (!item.datePublication) return plusRecent
          if (!plusRecent) return item
          return new Date(item.datePublication) > new Date(plusRecent.datePublication)
            ? item
            : plusRecent
        }, null)

        setDernierArticle(dernier)
        setPortraitsALaUne(portraits.filter((p) => p.alaUne))
        setEvenementsALaUne(evenements.filter((e) => e.alaUne));
      } catch (err) {
        console.error(err)
      }
    }

    chargerDonnees()
  }, [])

  // Lien de détail correct selon le type d'article
  const lienDernierArticle = dernierArticle
    ? dernierArticle.them === "event"
      ? `/evenement/${dernierArticle.rawId}`
      : `/portrait/${dernierArticle.rawId}`
    : "#"

  // Titre à afficher : titre WordPress pour un event, prénom + nom pour un portrait
  const titreDernierArticle = dernierArticle
    ? dernierArticle.them === "event"
      ? dernierArticle.title
      : `${dernierArticle.prenom} ${dernierArticle.nom}`
    : ""

  // Période à afficher (début - fin, ou naissance - décès)
  const periodeDernierArticle = dernierArticle
  ? `${Annee_affichage(dernierArticle.start)}${dernierArticle.end ? " - " + Annee_affichage(dernierArticle.end) : ""}`
  : ""


  // gsap //
  // Référence du texte : c'est le SEUL élément concerné par l'animation
  const txt = useRef(null);
  const parent = useRef(null);

 useEffect(() => {
  if (!txt.current) return;
  if (!parent.current) return; // si tu as bien une ref "parent" dans Accueil_av, sinon adapte

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: txt.current,
      start: "bottom 100%",
      endTrigger: parent.current,
      end: "bottom 100%",
      pin: txt.current,
      // markers: true,
    });
  }, txt);

  return () => ctx.revert();
}, [evenementsALaUne]); // ← se relance une fois les données (et donc le DOM) prêts


  return (
    <>
    <Nav />
    <main>

      {/* deniere article ajouter sur wordpress */}
    <section className="bg-sombre h-[83vh]">
      <div className="h-full w-full flex">
        {/* IMG */}
        <div className="w-1/2 h-full">
          {dernierArticle && (
            <img
              src={dernierArticle.image}
              alt={titreDernierArticle}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* info */}
        <div className="w-1/2 flex flex-col justify-end px-[3%]">
          {/* titre */}
        <div className="mb-10">
        <div className="w-full flex justify-between items-end">
            <h1 className="w-6/12 text-titre text-grand leading-none font-gravitas m-0">
  {dernierArticle?.them === "event" ? (
    titreDernierArticle
  ) : (
    <>
      {dernierArticle?.prenom} <br />
      {dernierArticle?.nom}
    </>
  )}
</h1>
            <h2 className="text-[20px] text-titre font-gravitas m-0">
              {periodeDernierArticle}
            </h2>
        </div>


        <hr className='bg-clair border-clair h-[4px] mt-1'></hr>
        </div>

        {/* txt : l'EXTRAIT WordPress, pas le paragraphe complet */}
        {dernierArticle && (
          <div
            className="mb-10 text-clair font-merri text-txt font-extralight"
            dangerouslySetInnerHTML={{ __html: dernierArticle.excerpt }}
          />
        )}

        {/* btn */}
        <div className="w-full flex justify-end mb-10">
          <Link className='text-txt text-titre font-gravitas cursor-pointer hover:underline' to={lienDernierArticle}>Aller lire</Link>
        </div>
        </div>



      </div>

    </section>

    <section className="flex h-[95vh] pl-gx">
      {/* txt */}
      <div className="w-8/12 border-r-2 pt-gx border-black">
      <p className="font-merri font-extralight text-sous w-5/6 my-[2vh]">
          L'Histoire qu'on a oubliée
        </p>
      <p className="w-4/6 font-merri text-txt font-extralight">
        A chaque époque des femmes ont inventé, dirigé, résisté et créé. Des femmes dont les noms ont
        été oublier, dont les contributions ont été minimisées ou attribuées à d'autres. Pourtant,
        elles étaient là.
        Mais l'histoire a longtemps été écrite par des hommes, et ont choisient ce qu'ils voulait retenir.
        <br/>
        <br/>
        Ce pendent on ne peut pas comprendre le monde d'aujourd'hui sans connaître les femmes qui l'ont
        bâti. Les inégalités actuelles ont des racines profondes, des siècles d'invisibilisation qui ne
        se sont pas effacés du jour au lendemain.<br/>
        Ici, nous racontons l'autre moitié de l'histoire. Celle qu'on ne vous a pas apprise à l'école.
        à travers des portraits de figures inspirantes et des articles sur des fait historique
        parce que connaître le passée, c'est comprendre le présent.
      </p>
      </div>

{/* btn ligne du temps */}
      <div className="w-4/12 h-full p-4 flex items-end justify-center">
      <Link className='font-gravitas text-titre text-sous text-center hover:underline' to="/articles">voir les articles</Link>
       </div>
    </section>

    {/* portrait a la une sur wordpress */}
    <section className="bg-sombre h-[85vh] w-auto p-5 flex gap-3">
      {portraitsALaUne.map((p) => (
        <Cart_portrait
          key={p.rawId}
          height="100%"
          width="400px"
          img="80%"
          txt="20%"
          rawId={p.rawId}
          image={p.image}
          prenom={p.prenom}
          nom={p.nom}
          naissance={p.start}
          nationalite={p.nationalite}
          metiers={p.metiers}
        />
      ))}
    </section>


{/* event une */}
    <section ref={parent} className="flex">
      {/* txt : c'est cet élément (et lui seul) qui reste immobile pendant le pin */}
      <div ref={txt} className="w-2/3 px-gx m-0 py-gx pr-[5%] h-full">
        <p className="font-merri font-extralight text-sous w-3/6 mb-10">
          Pourquoi voir l'histoire sous cette angle?
        </p>

        <p className="font-merri font-extralight text-txt ml-[15%] mr-[10%]">
          À travers nos films, séries et livres d'histoire, on nous a souvent
          dépeint les femmes comme des êtres passifs face aux événements de leur
          époque. Mais est-ce vraiment le cas ?
        </p>
      </div>

      {/* event a la une : défile normalement avec la page, aucune ref ni animation dessus */}
      <div className="w-1/3 flex flex-col items-end gap-6 border-l-2 border-sombre pt-10 pl-[5%]">
        {evenementsALaUne.map((event) => (
    <Cart_event
      key={event.rawId}
      height="450px"
      rawId={event.rawId}
      image={event.image}
      title={event.title}
      start={event.start}
      end={event.end}
    />
  ))}
      </div>
    </section>



    {/* new letter */}
    <section className="h-[45vh] flex justify-center items-center border-t-2 border-sombre">

      <div className="w-8/12 flex items-center">
      <div className="p-12 w-4/6 border-r-2 border-sombre">
        <h4 className="font-gravitas text-sous">Rejoignez le récit</h4>
        <p className="font-merri text-txt font-extralight w-5/6">
          Recevez les nouveaux portraits et articles chaque mois directement dans votre boîte mail.
        </p>
      </div>

      <Form />
</div>
    </section>

    </main>
    <Footer top="0px" />
    </>
  )
}

export default Accueil_av