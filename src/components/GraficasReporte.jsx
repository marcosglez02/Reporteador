import { useContext, useEffect, useState } from "react"
import { useGraficas } from "../hooks"
import { ArchivoContext } from "../context/ArchivoContext"
import { Bar, Line, Pie } from "react-chartjs-2"

const obtenerTablas = ()=>{
    return JSON.parse(localStorage.getItem('graficas'))
}

export const GraficasReporte = () => {
    console.log('Se generó el graficas reportes')

    const {graficas, contadorGraficas} = useGraficas()

    const [cambio, setCambio] = useState()

    const { actualizador } = useContext(ArchivoContext);

    const tablas = JSON.parse(localStorage.getItem('graficas'))
    console.log('Las tablas son',tablas)

    useEffect(() => {
       setCambio(obtenerTablas());
    }, [actualizador])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '',
            },
        },
    };
    console.log('Las tablas son',cambio)
    return cambio && cambio.length !=0 &&(
        <>
            <h4 className="text-center my-3">Reporte final</h4>
            <div className="container">
            
            <div className="row bg-white">

            
            {
                cambio.map(tabla =>{
                    if(tabla.tipo === 'pie'){
                        return(
                            <>
                            <div className="col-auto d-flex align-items-center">
                                <Pie data={tabla.payload} />
                            </div>
                            </>
                        )
                    }else if(tabla.tipo === 'line'){
                        return (
                            <>
                            <div className="col-auto d-flex align-items-center">
                                <Line data={tabla.payload} options={options} />
                            </div>
                            </>
                        )
                    }else if (tabla.tipo === 'barra'){
                        return (
                            <>
                            <div className="col-auto d-flex align-items-center">
                                <Bar data={tabla.payload} options={options} />
                            </div>
                            </>
                        )
                    }
                
                })
            }
            </div>
</div>
        </>
    )
}
