import { useTabla } from "../hooks"
import DataTable, { createTheme } from 'react-data-table-component'

export const Tabla = () => {

	const { tabla, campos, buscar, setBuscar, setFilter, filter } = useTabla()

	const paginationComponentOptions = {
		rowsPerPageText: 'Filas por página',
		rangeSeparatorText: 'de',
		selectAllRowsItem: true,
		selectAllRowsItemText: 'Todos',
	};

	createTheme('solarized', {
		background: {
			default: '#f8f8f'
		},
		divider: {
			default: '#073642',
		},
	});

	const customStyles = {
		headCells: {
			style: {
				paddingLeft: '2px', // override the cell padding for head cells
				paddingRight: '8px',
			},
		},
		cells: {
			style: {
				paddingLeft: '8px', // override the cell padding for data cells
				paddingRight: '8px',
			},
		},
	};



	let colorCelda = 0;
	const columns = campos?.map((column) => {
		colorCelda += 1
		if (colorCelda % 2 === 0) {
			return {
				name: column.toUpperCase(),
				selector: campos => campos[column],
				reorder: true,

				style: {
					backgroundColor: 'rgba(100, 100, 100, 1)',
				},
			}
		} else {
			return {
				name: column.toUpperCase(),
				selector: campos => campos[column],
				reorder: true,
				style: {
					backgroundColor: 'rgba(150, 150, 150, 1)',
				},
			}
		}
	})

	return (
		<>
			<div className="container">
				<input
					type="text"
					className="form-control"
					placeholder="Buscar"
					value={buscar}
					onChange={(e) => setBuscar(e.target.value)}
				/>
				<DataTable
					title='Registros Del Archivo'
					columns={columns}
					data={filter}
					pagination
					paginationComponentOptions={paginationComponentOptions}
					customStyles={customStyles}
					theme="solarized"
				/>
			</div>
		</>
	)
}
