import { Link } from 'react-router-dom'
import logo from "../../img/logo.png"

function Nav() {

  return (
     <nav className=' bg-clair'>
      <ul className='h-[8vh] flex justify-center items-end'>
        <li className='cursor-pointer font-merri'>
          <Link className='text-sombre hover:text-titre' to="/">Accueil</Link>
        </li>
        {/* img */}
        <div className= 'w-1/12 h-[100%] pt-2 mx-9'>
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </div>


        <li className='cursor-pointer font-merri'>
           <Link className='text-sombre hover:text-titre' to="/articles">Articles</Link>
        </li>
      </ul>
      <div className='bg-black border-black h-[3px] w-full mt-1'></div>
    </nav>
  )
}

export default Nav