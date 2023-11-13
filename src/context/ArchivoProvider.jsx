import { useState } from "react"
import { ArchivoContext } from "./ArchivoContext"

export const ArchivoProvider = ({children})=>{
    const [categoria, setCategoria] = useState([{categoria:'categoria'}])
    const [empresa, setEmpresa] = useState([{empresa:'empresa'}])
    const [departamento, setDepartamento] = useState([{departamento:'departamento'}])
    const [prioridad, setPrioridad] = useState([{prioridad:'prioridad'}])
    const [ubicacion, setUbicacion] = useState([{ubicacion:'ubicacion'}])
    const [subcategoria, setSubcategoria] = useState([{subcategoria:'subcategoria'}])
    const [tabla, setTabla] = useState()

    return(
        <ArchivoContext.Provider value={ 
            {categoria,empresa, departamento, prioridad, ubicacion, subcategoria,tabla
            ,setEmpresa, setCategoria, setDepartamento, setPrioridad, setUbicacion, setSubcategoria,setTabla} 
            }>
            { children }
        </ArchivoContext.Provider>
    )
}