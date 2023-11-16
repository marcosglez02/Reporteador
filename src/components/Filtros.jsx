import React, { useEffect } from 'react';
import { Graficas } from './Graficas';
import { useFiltros } from '../hooks/';
import { FiltrosSelects } from './FiltrosSelects';
import { FiltroSelectOrdernarPor } from './FiltroSelectOrdernarPor';
import { Tabla } from './Tabla';
import { GraficasReporte } from './GraficasReporte';
import { PDF } from './PDF';
import { PDFViewer } from '@react-pdf/renderer';


export const Filtros = ({ cambiarEstado }) => {

    const { categoria, empresa, ubicacion, prioridad, subcategoria, departamento, contador,
        ChartData, estadoGrafica, handleInput, handleSubmit, peticionesGet, fetchData, filtrado, onNewGrafica } = useFiltros()
    

    useEffect(() => {
        if (cambiarEstado) {
            peticionesGet()
        }
    }, [cambiarEstado])

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className='container'>

                    <>
                        <div className="row">

                            <FiltrosSelects valores={categoria} cambio={handleInput} nombre={'Categorías'} name={'categoria'} />

                            <FiltrosSelects valores={empresa} cambio={handleInput} nombre={'Empresas'} name={'empresa'} />

                            <FiltrosSelects valores={departamento} cambio={handleInput} nombre={'Departamento'} name={'departamento'} />

                            <FiltrosSelects valores={prioridad} cambio={handleInput} nombre={'Prioridad'} name={'prioridad'} />

                            <FiltrosSelects valores={ubicacion} cambio={handleInput} nombre={'Ubicación'} name={'ubicacion'} />

                            <FiltrosSelects valores={subcategoria} cambio={handleInput} nombre={'Subcategoría'} name={'subcategoria'} />

                            <div className="col">
                                <label className='form-label'>Fecha Inicio</label>
                                <input className='form-control' type='date' onChange={handleInput} name='fecha1' />
                            </div>
                            <div className="col">
                                <label className='form-label'>Fecha Fin</label>
                                <input className='form-control' type='date' onChange={handleInput} name='fecha2' />
                            </div>
                        </div>

                        <FiltroSelectOrdernarPor cambio={handleInput} datos={filtrado} />

                        <div className="d-grid gap-2">
                           <button className='btn btn-success mt-3 mb-3 py-2' type="submit">Buscar</button>
                        </div>
                    </>

                </div>
            </form>
            
            <Tabla />
            {
                
            contador !==0 &&(
                    <>
                        
                        <h4 className='text-center'>Previsualización de las gráficas</h4>

                        
                        <Graficas ChartData={ChartData} fetchData={fetchData} />
                        
                    </>
                    
                )
            }
            <GraficasReporte/>
        </>


    )
}
