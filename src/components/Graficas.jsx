import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, BarElement } from 'chart.js';
import { Doughnut, Pie, Bar, Line } from 'react-chartjs-2';
import { useFiltros } from '../hooks/';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, BarElement);

export const Graficas = ({ ChartData }) => {

    const { togglePieChart, toggleLineChart, toggleBarChart, mostrarPieChart, mostrarLineChart, mostrarBarChart, onNewGrafica } = useFiltros()



    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <>
            <div className="container">
                <div className="row bg-white justify-content-center">
                    {ChartData && ChartData.datasets && (
                        <>
                            <div className="col-10 text-center">
                                <button onClick={togglePieChart} className='btn'><i className="bi bi-pie-chart-fill"></i></button>
                                <button onClick={toggleLineChart} className='btn'><i className="bi bi-graph-up"></i></button>
                                <button onClick={toggleBarChart} className='btn'><i className="bi bi-bar-chart-fill"></i></button>

                            </div>
                            <div className="col-2">
                                <button className='btn btn-success my-2' onClick={onNewGrafica}>Agregar al reporte</button>
                            </div>

                            {mostrarPieChart ?
                                <div style={{ width: '500px', height: '600px' }} className="col d-flex align-items-center">
                                    <Pie data={ChartData} options={options} />
                                </div>
                                : null}
                            {mostrarLineChart ?
                                <div style={{ width: '500px', height: '600px' }} className="col d-flex align-items-center">
                                    <Line data={ChartData} options={options} />
                                </div>
                                : null}
                            {mostrarBarChart ?
                                <div style={{ width: '500px', height: '600px' }} className="col d-flex align-items-center">
                                    <Bar data={ChartData} options={options} />
                                </div>
                                : null}

                        </>

                    )}
                </div>
            </div>
        </>
    )
}
