import { useContext, useEffect, useState } from "react"
import { ArchivoContext,GraficasContext } from "../context"
import { Bar, Line, Pie } from "react-chartjs-2"
import html2canvas from "html2canvas";
import pdfConverter from 'jspdf'

const obtenerTablas = () => {
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
                position: 'right',
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
            "png",70,20,700,1000,'','MEDIUM'
          );
          pdf.save("Reporte.pdf");
          but.style.display = "block";
        });
      };


    console.log('Las tablas son', cambio)
    return cambio && cambio.length != 0 && (
        <>
            <h4 className="text-center my-3">Reporte final</h4>
            <div className="container mb-3">
                <div className="text-end">
                     <button className="btn btn-dark mb-2" onClick={(e) => div2PDF(e)}><i className="bi bi-file-earmark-pdf-fill"></i> Descargar PDF</button>
                </div>
           
                <div className="example row bg-white">


                    {
                        cambio.map(tabla => {
                            if (tabla.tipo === 'pie') {
                                return (
                                    <>
                                        <div style={{ minWidth: '500px', minHeight: '500px' }} className="col-md-11 d-flex align-items-center my-4">
                                            <Pie data={tabla.payload} options={options} />
                                        </div>
                                        <div className="col-1 align-self-center text-center">
                                            <button className="btn btn-outline-danger" onClick={ ()=> handleDeleteGrafica(tabla.id) }><i className="bi bi-trash3-fill"></i></button>
                                        </div>
                                    </>
                                )
                            } else if (tabla.tipo === 'line') {
                                return (
                                    <>
                                        <div style={{ minWidth: '500px', minHeight: '500px' }} className="col-md-11 d-flex align-items-center">
                                            <Line data={tabla.payload} options={optionsBar} />
                                        </div>
                                        <div className="col-1 align-self-center text-center">
                                            <button className="btn btn-outline-danger" onClick={ ()=> handleDeleteGrafica(tabla.id) }><i className="bi bi-trash3-fill"></i></button>
                                        </div>
                                    </>
                                )
                            } else if (tabla.tipo === 'barra') {
                                return (
                                    <>
                                        <div style={{ minWidth: '500px', minHeight: '500px' }} className="col-md-11 d-flex align-items-center">
                                            <Bar data={tabla.payload} options={optionsBar} />
                                        </div>
                                        <div className="col-1 align-self-center text-center">
                                            <button className="btn btn-outline-danger" onClick={ ()=> handleDeleteGrafica(tabla.id) }><i className="bi bi-trash3-fill"></i></button>
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
