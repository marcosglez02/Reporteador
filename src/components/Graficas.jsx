import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from 'chart.js';
import { Doughnut, Pie, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler);

export const Graficas = ({ ChartData },) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Panchitos',
            },
        },
    };

    return (
        <>
            <div className="container">
                <div className="row bg-light">
                    {ChartData && ChartData.datasets && (
                        <>
                            <div className="col d-flex align-items-center">
                                <Pie data={ChartData} />
                            </div>
                            <div className="col d-flex align-items-center">
                                <Line data={ChartData} options={options} />
                            </div>
                        </>

                    )}
                </div>
            </div>
        </>
    )
}
