import { Doughnut, Pie, Bar, Line } from 'react-chartjs-2';

export const Grafica = ({ ChartData, options }) => {
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
}