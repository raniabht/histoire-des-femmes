import { Link } from 'react-router-dom'
import { DateAffichage } from "./DateTimeline"
import { AnneeAffichage } from "./DateTimeline"

function CartEvent({ height, rawId, image, title, start, end, margin }) {
    return (
        <>
         {/* cart */}
         <Link style={{ height: height}} className="w-[450px] mb-10 mr-gx text-clair border-sombre bg-sombre border-l-[4px] border-t-[4px] flex flex-col justify-between hover:border-titre" to={`/evenement/${rawId}`}>

                <div className="h-2/6 flex flex-col justify-around">
                {/* titre */}
                <div className="mt-3 px-4">
                <h2 className="font-gravitas text-sous leading-none ">{title}</h2>
                </div>
                {/* date */}
                <div className="text-sous font-gravitas flex items-center flex-col">

                    <hr className='bg-clair border-clair w-10 h-[4px] mt-1 hr'></hr>
                    <p className="font-gravitas text-ptt leading-none mt-[5px]">
                         {AnneeAffichage(start)}{end ? " - " + AnneeAffichage(end) : ""}
                    </p>
                </div>
                </div>

                <div className="h-4/6">
                  {image && (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                  )}
                </div>

            </Link>


        </>
    )
}

export default CartEvent