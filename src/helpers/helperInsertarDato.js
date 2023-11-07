import axios from "axios";

const  random = ()=> {
  return Math.floor(Math.random() * (1000 - 0 + 1));
}

export const helperInsertarDato = async (fileContent, cambiarEstado)=>{

  const datos = JSON.parse(fileContent);

  const nombreTabla = (new Date().getTime() * 2).toString() + (random()).toString();

  localStorage.setItem('nombre', nombreTabla)

  try {
    console.log('Entró al try')
    await axios.post('http://localhost:3000/api/insertarExcelReactTabla', { name: nombreTabla }, {
      Headers: { 'Content-Type': 'application/json' }
    })

    await axios.post('http://localhost:3000/api/insertarExcelReact', { content: datos, name: nombreTabla }, {
        Headers: { 'Content-Type': 'application/json' },
    })


  } catch (error) {
    console.log(error)
  }finally{
      console.log('AFUERA DEL TRY')
      cambiarEstado(true)
  }

}