import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from 'chart.js';
import { Doughnut, Pie, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement, LineElement, Title, Filler);

export const Graficas = ({ ChartData },) => {
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };

    return (
        <>
            <div className="row">
                {ChartData && ChartData.datasets && (
                    <>
                        <div className="col">
                            <Pie data={ChartData}/>
                        </div>
                        <div className="col">
                            <Line data={ChartData} options={options}/>
                        </div>
                    </>

                )}
            </div>
        </>
    )
}
