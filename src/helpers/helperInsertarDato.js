import axios from "axios";

const  random = ()=> {
  return Math.floor(Math.random() * (1000 - 0 + 1));
}

export const helperInsertarDato = async (fileContent, cambiarEstado)=>{

  const datos = JSON.parse(fileContent);

  const nombreTabla = (new Date().getTime() * 2).toString() + (random()).toString();

  const tablaAntigua = localStorage.getItem('nombre');

  if(tablaAntigua===undefined){

  }else{
    const res = await axios.post('http://localhost:3000/api/eliminarTabla', { name: tablaAntigua }, {
      Headers: { 'Content-Type': 'application/json' }
    })

    console.log(res.data)
  }

  localStorage.setItem('nombre', nombreTabla)

  try {
    console.log('Entró al try')
    const respuesta = await axios.post('http://localhost:3000/api/insertarExcelReactTabla', { name: nombreTabla }, {
      Headers: { 'Content-Type': 'application/json' }
    })
    console.log(respuesta.data)

    const resDatos = await axios.post('http://localhost:3000/api/insertarExcelReact', { content: datos, name: nombreTabla }, {
        Headers: { 'Content-Type': 'application/json' },
    })
    console.log(resDatos.data)

  } catch (error) {
    console.log(error)
  }finally{
      console.log('AFUERA DEL TRY')
      cambiarEstado(true)
  }

}