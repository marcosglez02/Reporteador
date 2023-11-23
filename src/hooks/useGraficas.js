import { useContext, useEffect, useState } from "react";
import { ArchivoContext, GraficasContext } from "../context";

export const useGraficas = () => {
    const [mostrarPieChart, setMostrarPieChart] = useState(true);
    const [mostrarLineChart, setMostrarLineChart] = useState(false);
    const [mostrarBarChart, setMostrarBarChart] = useState(false);
    const [mostrarDoughnutChart, setDoughnutChart] = useState(false);

    const { handleNewGrafica, contador, setContador, ChartData, setChartData } = useContext(GraficasContext);

    const { titulo, datosPost } = useContext(ArchivoContext)

    const togglePieChart = () => {
        setMostrarLineChart(false)
        setMostrarBarChart(false)
        setDoughnutChart(false)
        setMostrarPieChart(!mostrarPieChart)
    };

    const toggleLineChart = () => {
        setMostrarPieChart(false)
        setMostrarBarChart(false)
        setDoughnutChart(false)
        setMostrarLineChart(!mostrarLineChart)
    };

    const toggleBarChart = () => {
        setMostrarPieChart(false)
        setMostrarLineChart(false)
        setDoughnutChart(false)
        setMostrarBarChart(!mostrarBarChart)
    };

    const toggleDoughnutChart = () => {
        setMostrarPieChart(false)
        setMostrarLineChart(false)
        setMostrarBarChart(false)
        setDoughnutChart(!mostrarDoughnutChart)
    };
    const fetchData = () => {
        setChartData({
            labels: datosPost.map(element => element.labels),
            datasets: [{
                fill: true,
                label: 'Numero de tickets',
                data: datosPost.map(element => element.numero),
                borderColor: ['rgba(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(0, 85, 247)'],
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

    useEffect(() => {
        if (datosPost.length != 0) {
            fetchData()
        }
    }, [datosPost])


    const onNewGrafica = () => {
        let tipo = ''
        if (mostrarBarChart) {
            tipo = 'barra'
        } else if (mostrarLineChart) {
            tipo = 'line'
        } else if (mostrarPieChart) {
            tipo = 'pie'
        } else {
            tipo = 'dona'
        }

        const newGrafica = {
            id: contador,
            tipo,
            titulo,
            payload: ChartData
        }
        setContador(contador + 1)
        handleNewGrafica(newGrafica)
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const optionsLine = {
        maintainAspectRatio: false,
        responsive: true,
        fill: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return {
        mostrarBarChart, mostrarLineChart, mostrarPieChart, mostrarDoughnutChart, ChartData,
        toggleBarChart, toggleLineChart, togglePieChart, toggleDoughnutChart, fetchData,
        options, optionsLine,
        onNewGrafica
    }
}
