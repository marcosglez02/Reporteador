import { useEffect, useState } from "react"
import { Seleccionador, Filtros } from "./"

export const Principal = () => {

  const [mostradorFiltro, setMostradorFiltro] = useState(false)

  return (
    <>
    <div className="bg-secondary">
      
    
      <nav className="bg-dark">
        <h1 className="text-center text-white pt-4 pb-4">SysReport</h1>
        </nav>
      {mostradorFiltro ? (<Filtros cambiarEstado={mostradorFiltro}/>) : (<Seleccionador cambiarEstado={setMostradorFiltro}/>)}
      </div>
    </>
  )
}
