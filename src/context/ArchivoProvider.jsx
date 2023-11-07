import { useState } from "react"
import { ArchivoContext } from "./ArchivoContext"

export const ArchivoProvider = ({children})=>{
    const [categoria, setCategoria] = useState([{categoria:'categoria'}])
    const [empresa, setEmpresa] = useState([{empresa:'empresa'}])
    const [departamento, setDepartamento] = useState([{departamento:'departamento'}])
    const [prioridad, setPrioridad] = useState([{prioridad:'prioridad'}])
    const [ubicacion, setUbicacion] = useState([{ubicacion:'ubicacion'}])
    const [subcategoria, setSubcategoria] = useState([{subcategoria:'subcategoria'}])

    return(
        <ArchivoContext.Provider value={ 
            {categoria,empresa, departamento, prioridad, ubicacion, subcategoria
            ,setEmpresa, setCategoria, setDepartamento, setPrioridad, setUbicacion, setSubcategoria} 
            }>
            { children }
        </ArchivoContext.Provider>
    )
}