import { useContext, useEffect, useState } from "react"
import { useGraficas } from "../hooks"
import { ArchivoContext } from "../context/ArchivoContext"
import { Bar, Line, Pie } from "react-chartjs-2"
import html2canvas from "html2canvas";
import pdfConverter from 'jspdf'

const obtenerTablas = () => {
    return JSON.parse(localStorage.getItem('graficas'))
}

export const GraficasReporte = () => {
    console.log('Se generó el graficas reportes')

    const { graficas, contadorGraficas } = useGraficas()

    const [cambio, setCambio] = useState()

    const { actualizador } = useContext(ArchivoContext);

    const tablas = JSON.parse(localStorage.getItem('graficas'))
    console.log('Las tablas son', tablas)

    useEffect(() => {
        setCambio(obtenerTablas());
    }, [actualizador])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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

    const optionsBar = {
        responsive: true,
        maintainAspectRatio: false,
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

    const div2PDF = (e) => {
        /////////////////////////////
        // Hide/show button if you need
        /////////////////////////////
    
        const but = e.target;
        but.style.display = "none";
        let input = window.document.getElementsByClassName("example")[0];
    
        html2canvas(input).then(canvas => {
          const img = canvas.toDataURL("image/png");
          
          const pdf = new pdfConverter("l", "pt");
          pdf.addImage(
            img,
            "png",0,0,500,500
          );
          pdf.save("chart.pdf");
          but.style.display = "block";
        });
      };


    console.log('Las tablas son', cambio)
    return cambio && cambio.length != 0 && (
        <>
            <h4 className="text-center my-3">Reporte final</h4>
            <div className="container mb-3">

                <div className="row bg-white">


                    {
                        cambio.map(tabla => {
                            if (tabla.tipo === 'pie') {
                                return (
                                    <>
                                        <div style={{ minWidth: '500px', minHeight: '500px' }} className="example col-md-11 d-flex align-items-center my-4">
                                            <Pie data={tabla.payload} options={options} />
                                            <button onClick={(e) => div2PDF(e)}>Export 2 PDF</button>
                                        </div>
                                    </>
                                )
                            } else if (tabla.tipo === 'line') {
                                return (
                                    <>
                                        <div style={{ minWidth: '500px', minHeight: '500px' }} className="col-md-11 d-flex align-items-center">
                                            <Line data={tabla.payload} options={optionsBar} />
                                        </div>
                                    </>
                                )
                            } else if (tabla.tipo === 'barra') {
                                return (
                                    <>
                                        <div style={{ minWidth: '500px', minHeight: '500px' }} className="col-md-11 d-flex align-items-center">
                                            <Bar data={tabla.payload} options={optionsBar} />
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
