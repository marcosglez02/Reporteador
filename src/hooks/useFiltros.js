import { useContext, useEffect, useState } from "react"
import { URLs } from '../common/URLs'
import axios from "axios"
import { ArchivoContext } from "../context/ArchivoContext"

export const useFiltros = () => {
    const [todo, setTodo] = useState([])
    const [filtrado, setFiltrado] = useState({})
    const [datosPost, setdatosPost] = useState([])
    const [ChartData, setChartData] = useState({})
    const [estadoGrafica, setEstadoGrafica] = useState(false)

    // Contexto
    const { categoria, empresa, departamento, prioridad, ubicacion, subcategoria,
         setCategoria, setEmpresa, setDepartamento, setPrioridad, setUbicacion, setSubcategoria } = useContext(ArchivoContext);

    const handleSubmit = async (event) => {
        const nombreTabla = localStorage.getItem('nombre')
        // Cancelar el evento de recarga de la pagina
         event.preventDefault()
        // Peticion post a la api 
        await axios.post('http://localhost:3000/api/filtrado', [filtrado, {name: nombreTabla}] ,{headers: {"Content-Type": "application/json"}})
            .then(response => setdatosPost(response.data))
            .catch(error => console.log(error))
             //setEstadoGrafica(true);
        console.log('HandleSubmit')
    }


    const fetchData = () => {
        setChartData({
            labels: datosPost.map(element => element.labels),
            datasets: [{
                fill: true,
                label: '# de Categorias en Prioridad Alta',
                data: datosPost.map(element => element.numero),
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(0, 85, 247, 0.8)',
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(0, 85, 247, 0.8)']
            }]
        })
    }

    const handleInput = (event) => {
        setFiltrado({ ...filtrado, [event.target.name]: event.target.value })
    }
    
    const peticionesGet = async () => {
        const nombreTabla = localStorage.getItem('nombre')
        
        console.log('Entró al peticiones get')
        Promise.all(URLs.map((url) => axios.post(url, {name: nombreTabla}))).then(
            axios.spread(({ data: categorias }, { data: empresas }, { data: ubicacion }, { data: departamento }, { data: prioridad }, { data: subcategoria }) => {
                setCategoria(categorias);
                setEmpresa(empresas);
                setUbicacion(ubicacion);
                setDepartamento(departamento);
                setPrioridad(prioridad);
                setSubcategoria(subcategoria);
                
            })
        );
        console.log(todo)
        // const results = await axios.post('http://localhost:3000/api/categorias', { name: nombreTabla }, {
        //     Headers: { 'Content-Type': 'application/json' },
        //   })
        // console.log(results)
               
    }

    useEffect(() => {
        if (datosPost.length != 0) {
            fetchData()
        }
    }, [datosPost])

return {
    todo, 
    ChartData, 
    estadoGrafica, 
    handleInput, 
    handleSubmit, 
    peticionesGet,
    fetchData, 
    categoria, empresa, departamento, prioridad, subcategoria, ubicacion 
}

}
