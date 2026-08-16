
import img_menu from "../../img/menu.svg"
import img_croix from "../../img/croix.svg"
import { useState } from "react"

function Menu() {
  const [menuOuvert, setMenuOuvert] = useState(false)

  return (
    <>
      {/* IMG MENU — visible seulement si le menu est FERMÉ */}
      {!menuOuvert && (
        <div
          className='px-3 py-0 fixed top-[9vh] right-0 bg-sombre cursor-pointer'
                    onClick={() => setMenuOuvert(true)}
        >

          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16"  
          className="object-contain titre stroke-clair hover:stroke-titre"

           >
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>
        </div>
      )}

      {/* IMG CROIX — visible seulement si le menu est OUVERT */}
      {menuOuvert && (
        <div className='fixed top-[9vh] right-0 bg-sombre z-20 pl-[2%] pr-[5%] py-[2%] w-[420px] cursor-pointer'>

            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"
            className="object-contain absolute stroke-clair right-4 top-4 hover:stroke-titre"
            onClick={() => setMenuOuvert(false)}
            >
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>

          <div className='text-clair text-[20px] font-gravitas flex justify-between'>
            <p className='hover:text-titre'>evenement</p>
            <p className='hover:text-titre'>portrait</p>
          </div>
          <hr className='bg-clair border-clair h-[4px] mt-1'></hr>

          <div className='text-clair text-[20px] font-gravitas grid grid-cols-2 col-span-2 mt-4 gap-1'>
            <p className='hover:text-titre'>Science</p>
            <p className='hover:text-titre'>Social</p>
            <p className='hover:text-titre'>politique</p>
            <p className='hover:text-titre'>art</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Menu