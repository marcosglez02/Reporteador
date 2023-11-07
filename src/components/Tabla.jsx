import { useState } from "react"


export const Tabla = ({data}) => {
    
    const [chartUserData, setChartUserData] = useState({
        labels: data.map(data=> data['Ubicación']),
        datasets: [{
            label: 'Reportes por ubicación',
            data: data.map(data=> data['Ubicación'])
        }]
    })
  return (
    <>
        <table className="table table-bordered border-dark fs-8">
        <thead className="table-dark">
                    <tr className="text-center">
                        <th>#</th>
                        <th>Ubicación</th>
                        <th>Empresa</th>
                        <th>Depto</th>
                        <th>Usuario Solicitud</th>
                        <th>Hr. solicitud</th>
                        <th>Hr. Cierre</th>
                        <th>Venci</th>
                        <th>Asignado </th>
                        <th>Prioridad</th>
                        <th>Estado</th>
                        <th>Categoría</th>
                        <th>Subcategoría</th>
                        
                    </tr>
                </thead>
                <tbody className="text-center table-group-divider">
                     {data.map(( item, indice ) =>{
                        if(indice > 3){ return }
                        return(
                            <tr>
                                <td>{ item['#'] }</td>
                                <td>{ item['Ubicación'] }</td>
                                <td>{ item['Empresa'] }</td>
                                <td>{ item['Departamento'] }</td>
                                <td>{ item['Usuario de solicitud'] }</td>
                                <td>{ new Date((item['Hora de solicitud'] - (25567 +2)) * 86400 * 1000).toUTCString() }</td>
                                <td>{ new Date((item['Hora de cierre'] - (25567 +2)) * 86400 * 1000).toUTCString() }</td>
                                <td>{ new Date((item['Fecha de vencimiento'] - (25567 +2)) * 86400 * 1000).toUTCString() }</td>
                                <td>{ item['Asignado a'] }</td>
                                <td>{ item['Prioridad'] }</td>
                                <td>{ item['Estado'] }</td>
                                <td>{ item['Categoría'] }</td>
                                <td>{ item['Subcategoría'] }</td>
                            </tr>
                            
                        )
                        
                     })}
                        
                        
                        {/* <td> dataExcel[item]['Ubicación'] </td>
                        <td> dataExcel[item]['Usuario de solicitud']</td>
                        <td style="max-width: 100px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"> new Date((dataExcel[item]['Hora de solicitud'] - (25567 +2)) * 86400 * 1000).toUTCString()</td>
                        <td style="max-width: 100px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"> new Date((dataExcel[item]['Hora de cierre'] - (25567 +2)) * 86400 * 1000).toUTCString()</td>
                        <td> dataExcel[item]['Asignado a'] </td>
                        <td> dataExcel[item]['Categoría'] </td>
                        <td>dataExcel[item]['Subcategoría'] </td>
                        <td>dataExcel[item]['Estado'] </td> */}
                    
                </tbody>
        </table>
        
    </>
  )
}
