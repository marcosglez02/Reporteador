export const useGrafica = () =>{

    const handleSubmit = async (event) => {
        // Cancelar el evento de recarga de la pagina
         event.preventDefault()
        // Peticion post a la api 
        await axios.post('http://localhost:3000/api/filtrado', post,{headers: {"Content-Type": "application/json"}})
            .then(response => setdatosPost(response.data))
            .catch(error => console.log(error))
    }

}