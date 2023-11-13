import { useContext, useEffect, useState } from "react"
import { URLs } from '../common/URLs'
import axios from "axios"
import { ArchivoContext } from "../context/ArchivoContext"

export const useFiltros = () => {
    const [todo, setTodo] = useState([])
    //const [filtrado, setFiltrado] = useState({})
    const [datosPost, setdatosPost] = useState([])
    const [ChartData, setChartData] = useState({})
    const [estadoGrafica, setEstadoGrafica] = useState(false)

    // Contexto
    const { categoria, empresa, departamento, prioridad, ubicacion, subcategoria, filtrado, ordenarPor,
         setCategoria, setEmpresa, setDepartamento, setPrioridad, setUbicacion, setSubcategoria, setFiltrado, setOrdenarPor } = useContext(ArchivoContext);

    const handleSubmit = async (event) => {
        const nombreTabla = localStorage.getItem('nombre')
        // Cancelar el evento de recarga de la pagina
         event.preventDefault()
         console.log(filtrado.ordenar)

        if(ordenarPor === undefined || ordenarPor.length === 0 || ordenarPor === 'Todos'){
            alert('Selecciona un filtrado');
            console.log(ordenarPor)
        }else{
            
        // Peticion post a la api 
        await axios.post('http://localhost:3000/api/filtrado', [filtrado, {name: nombreTabla, ordenamiento: ordenarPor}] ,{headers: {"Content-Type": "application/json"}})
            .then(response => setdatosPost(response.data))
            .catch(error => console.log(error))
             //setEstadoGrafica(true);
        console.log('HandleSubmit')
        }

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
                backgroundColor: ['rgba(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(0, 85, 247)']
            }]
        })
    }

    const handleInput = (event) => {

        const valor = event.target.value;
        const nombre = event.target.name;
        const nombreOrdenamiento = ordenarPor;

        if(nombreOrdenamiento === nombre){
            setOrdenarPor('')
        }

        setFiltrado( (c)=> {
            if( valor === 'Todos'){
                const a = {...c};
                delete a[nombre];
                return a;
            } 
            return {...c, [nombre] : valor}
        })
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
    filtrado, 
    categoria, empresa, departamento, prioridad, subcategoria, ubicacion 
}

}
