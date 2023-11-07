import React, { useEffect } from 'react';
import { Graficas } from './Graficas';
import { useFiltros } from '../hooks/';
import { FiltrosSelects } from './FiltrosSelects';

export const Filtros = ({ cambiarEstado }) => {

    const { categoria, empresa, ubicacion, prioridad, subcategoria, departamento, ChartData, estadoGrafica, handleInput, handleSubmit, peticionesGet, fetchData } = useFiltros()

    useEffect(() => {
        if (cambiarEstado) {
            peticionesGet()
        }
    }, [cambiarEstado])


    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className='container'>
                    {estadoGrafica ?
                        <Graficas ChartData={ChartData} fetchData={fetchData} />
                        : (
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
                                        <input className='form-control' type='date' min='2018-01-20' onChange={handleInput} id='Fecha1' name='fecha1' />
                                    </div>
                                    <div className="col">
                                        <label className='form-label'>Fecha Fin</label>
                                        <input className='form-control' type='date' />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col mt-2">
                                    <label className='form-label'>Ordenar por</label>
                                    <select onChange={handleInput} className="form-select form-select-sm" aria-label="Small select example" id='ordenar' name='ordenar'>
                                        <option value='categoria'>Categoria</option>
                                        <option value='empresas'>Empresas</option>
                                        <option value='ubicacion'>Ubicacion</option>
                                        <option value='departamento'>Departamento</option>
                                        <option value='prioridad'>Prioridad</option>
                                        <option value='subcategoria'>Subcategoria</option>
                                        <option value='empleado'>Empleado</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <button className='btn btn-outline-success s mt-3' type="submit">Enviar</button>
                                </div>

                            </>
                        )}

                </div>
            </form>
        </>


    )
}
