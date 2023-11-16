import { useContext, useEffect, useState } from "react"
import { ArchivoContext,GraficasContext } from "../context"
import { Bar, Line, Pie } from "react-chartjs-2"

const obtenerTablas = ()=>{
    return JSON.parse(localStorage.getItem('graficas'))
}

export const GraficasReporte = () => {

    const {handleDeleteGrafica} = useContext(GraficasContext)

    const [cambio, setCambio] = useState()

    const { actualizador } = useContext(ArchivoContext);
    

    useEffect(() => {
       setCambio(obtenerTablas());
    }, [actualizador])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: '',
            },
        },
    };
    
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
                                <Pie data={tabla.payload} options={options} />
                                <button className="btn btn-danger" onClick={ ()=> handleDeleteGrafica(tabla.id) }>Eliminar</button>
                            </div>
                            </>
                        )
                    }else if(tabla.tipo === 'line'){
                        return (
                            <>
                            <div className="col-auto d-flex align-items-center">
                                <Line data={tabla.payload} options={options} />
                                <button className="btn btn-danger" onClick={ ()=> handleDeleteGrafica(tabla.id) }>Eliminar</button>
                            </div>
                            </>
                        )
                    }else if (tabla.tipo === 'barra'){
                        return (
                            <>
                            <div className="col-auto d-flex align-items-center">
                                <Bar data={tabla.payload} options={options} />
                                <button className="btn btn-danger" onClick={ ()=> handleDeleteGrafica(tabla.id) }>Eliminar</button>
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
