import { Link } from 'react-router-dom'
import { Date_affichage } from "./DateTimeline"

 {/* section Evènement */}
 function Cart_portrait({ height, width, img, txt, rawId, image, prenom, nom, naissance, nationalite, metiers }) {
    return(
        <>

     {/* cart */}
     <Link style={{ height: height, width: width }} className="border-[4px] px-[3px] border-clair flex flex-col hover:border-titre" to={`/portrait/${rawId}`}>

        {/* img */}
        <div style={{height: img}} >
          {image && (
            <img src={image} alt={`${prenom} ${nom}`} className="w-full h-full object-cover" />
          )}
        </div>

        {/* txt */}
        <div style={{height: txt}} className="flex flex-col justify-between mx-[2%]">
            {/* nom */}
            <h2 className="text-clair font-gravitas text-sous leading-none mt-[5px]">
                {prenom} <br/> {nom}
            </h2>

            {/* liste d'info  */}
            <div className="flex justify-between mb-[4px]">
                <p className="text-clair text-[14px] font-merri font-normal">{Date_affichage(naissance)}</p>
                <p className="text-clair text-[14px] font-merri font-normal">{nationalite}</p>
                <p className="text-clair text-[14px] font-merri font-normal">{metiers}</p>
            </div>
        </div>
</Link>

        </>
    )
 }

 export default Cart_portrait