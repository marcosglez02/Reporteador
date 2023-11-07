import { useEffect, useState } from "react"
import { Seleccionador, Filtros } from "./"

export const Principal = () => {

  const [mostradorFiltro, setMostradorFiltro] = useState(false)

  return (
    <>
        <h1 className="text-center bg-secondary pt-4 pb-4">Bienvenido al reporteador</h1>
 
      {mostradorFiltro ? (<Filtros cambiarEstado={mostradorFiltro}/>) : (<Seleccionador cambiarEstado={setMostradorFiltro}/>)}
        
    </>
  )
}
