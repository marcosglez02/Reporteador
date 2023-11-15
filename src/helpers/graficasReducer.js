
export const graficasReducer = (estadoInicial , accion)=>{

    switch(accion.type){

        case 'AGREGAR GRAFICA':
            // const final = [...estadoInicial, accion.payload ];
            // localStorage.setItem('graficas', JSON.stringify(final))
            // console.log('el valor final es',final)
            return [...estadoInicial, accion.payload ];

        case 'ELIMINAR GRAFICA':
            return estadoInicial.filter(grafica=> grafica.id !== accion.payload);
        
        default:
            return estadoInicial;

    }

}