import { useContext, useEffect, useReducer } from "react"
import { graficasReducer } from "../helpers"
import { ArchivoContext } from "../context/ArchivoContext"

const init = ()=>{
    return JSON.parse( localStorage.getItem('graficas')) || []
}


export const useGraficas = () => {

    const [graficas, dispatch] = useReducer( graficasReducer, [], init )

    const {actualizador, setActualizador} = useContext(ArchivoContext)

    useEffect(() => {
        console.log('Entró a guardar al localstorage')
        localStorage.setItem('graficas', JSON.stringify( graficas ) )
        setActualizador(!actualizador)
      }, [graficas])

    const handleNewGrafica = ( grafica )=>{
        const accion ={
            type: 'AGREGAR GRAFICA',
            payload: grafica
        }
        dispatch(accion)    
    }

    const handleDeleteGrafica = ( id ) => {
        const accion = {
            type: 'ELIMINAR GRAFICA',
            payload: id
        }
        dispatch(accion)
    }

    const contadorGraficas = graficas.length;

    return{
        graficas, handleNewGrafica, handleDeleteGrafica, contadorGraficas
    }
}
