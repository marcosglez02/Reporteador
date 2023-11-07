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
            <div className="container">
                {ChartData && ChartData.datasets && (
                    <>
                        <div className="container ">
                            <Pie data={ChartData}/>
                        </div>
                        <div className="container ">
                            <Line data={ChartData} options={options}/>
                        </div>
                    </>

                )}
            </div>
        </>
    )
}
