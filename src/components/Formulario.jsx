import { useState, useEffect } from "react"

import Error from "./Error"

import {emptyValidation} from "../utils/formValidation"
import Paciente from "./Paciente";



const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');

  const [propietario, setPropietario] = useState('');

  const [email, setEmail] = useState('');

  const [fecha, setFecha] = useState('');

  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(()=>{

    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
    else{
      console.log("no hay pacientes")
    }
   
  }, [paciente])

  
  const generarId = () => {
    const random = Math.random().toString(36).substring(2)

    const fecha = Date.now().toString(36)

    return random + fecha
  }


  const handleSubmit = (j) =>{

    j.preventDefault();
 
    if (emptyValidation([nombre,propietario,email,fecha,sintomas])){
      //console.log('falta algun campo')

      setError(true);
      return;

    }

    setError(false);


    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
       
    }

    if (paciente.id){
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id ===
      paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados);

      setPaciente({});
    }

    else {
      objetoPaciente.id = generarId()

      setPacientes([...pacientes, objetoPaciente])
    }

   // re iniciar el form

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    
    
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5"> 
      <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y {''}
        <span className="text-indigo-600 font-bold">administralos</span>
      </p>

      <form 
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5"
      >
       {error && <Error><p>todos los campos son obligatorios</p></Error> }

        <div className="mb-5">
          
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota 
          </label>

          <input
            id="mascota"
            type="text" 
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          
        </div>

        <div className="mb-5">
          
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
            Nombre propietario {''}
          </label>

          <input 
            id="propietario"
            type="text" 
            placeholder="Nombre del propietario"
            className="border-2 w-full p2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
          
        </div>

        <div className="mb-5">
          
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            email {''}
          </label>

          <input 
            id="email"
            type="email" 
            placeholder="email del propietario"
            className="border-2 w-full p2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
        </div>

        <div className="mb-5">
          
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
            alta {''}
          </label>

          <input 
            id="alta"
            type="date" 
            placeholder="alta"
            className="border-2 w-full p2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          
        </div>

        <div>
          
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            síntomas {''}
          </label>

         <textarea 
           id="sintomas"  
           className="border-2 w-full p2 mt-2 placeholder-gray-400 rounded-md mb-5"
           placeholder="describe los síntomas"
           value={sintomas}
           onChange={(e) => setSintomas(e.target.value)}
          />
         
        </div>

         <input 
         type="submit" 
         className= "bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors "
         value={paciente.id ? 'editar paciente' : 'agregar paciente'}/>


          
        



      </form>
    </div>
  )
}

export default Formulario
