import imgNoPicture from '../img/insendi.webp';

function Cart() {
  return (
    <a href="" className="block w-[220px] border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
      
      {/* Texte en haut */}
      <div className="px-2 py-1 bg-gray-50 border-b border-gray-200">
        <h5 className="text-[13px] font-bold text-gray-900 truncate">
          Le titre d'un article
        </h5>
        <p className="text-[11px] font-light text-gray-400 mt-0.5">
          1850 - 1855
        </p>
      </div>

      {/* Image */}
      <div className="w-full h-[140px] overflow-hidden">
        <img 
          src={imgNoPicture} 
          alt="article"
          className="w-full h-full object-cover"
        />
      </div>

    </a>
  )
}

export default Cart