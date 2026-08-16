import CartEvent from "../detail/CartEvent"
import CartPortrait from "../detail/CartPortrait"

function Decouvrir({ articles = [] }) {

  const portraitsLies = articles.filter((a) => a.them === "portrait")
  const evenementsLies = articles.filter((a) => a.them === "event")

  if (articles.length === 0) return null

  return (
    <>
      <section>
        {/* les autre article */}
        <div className="h-[40vh] flex items-end border-t-[4px] border-sombre bg-clair">
          <h1 className="px-gx text-grand leading-none font-gravitas mt-[10vh] w-full text-center ">
            À découvrir
          </h1>
        </div>

        {/* portrait */}
        {portraitsLies.length > 0 && (
          <div>
            <hr className='bg-sombre border-sombre h-[4px] mt-[15vh]'></hr>
            <h3 className="mt-3 px-gx font-merri text-sous">
              Portrait
            </h3>

            <div>
              <div className="mt-5 h-[85vh] p-5 px-gx flex gap-3 bg-sombre">
                {portraitsLies.map((p) => (
                  <CartPortrait
                    key={`portrait-${p.rawId}`}
                    height="100%"
                    width="400px"
                    img="80%"
                    txt="20%"
                    rawId={p.rawId}
                    image={p.image}
                    prenom={p.prenom}
                    nom={p.nom}
                    naissance={p.naissance}
                    nationalite={p.nationalite}
                    metiers={p.metiers}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Evènement */}
        {evenementsLies.length > 0 && (
          <div className="mt-[13vh] ">
            <hr className='bg-sombre border-sombre h-[4px] mt-1'></hr>
            <h3 className="mt-3 px-gx font-merri text-sous">
              Evènement
            </h3>

            {/*groupe  cart */}
            <div className="mt-5 grid grid-cols-[repeat(auto-fill,450px)] justify-center p-5 gap-3">
              {evenementsLies.map((e) => (
                <CartEvent
                  key={`event-${e.rawId}`}
                  height="500px"
                  rawId={e.rawId}
                  image={e.image}
                  title={e.title}
                  start={e.debut}
                  end={e.fin}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>

  )
}

export default Decouvrir