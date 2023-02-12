import { useState,useEffect } from 'react'
import CerrarModal from '../img/cerrar.svg'
import Mensaje from './Mensaje'



const Modal = ({setModal,animarModal, setAnimarModal,guardarGasto, gastoEditar,setGastoEditar}) =>{
const [nombre, setNombre] = useState('')
const [cantidad, setCantidad] = useState('')
const [categoria, setCategoria] = useState('')
const [mensaje,setMensaje] = useState('')
const [id, setId] = useState('')
const [fecha, setFecha] = useState('')

useEffect(()=>{
    if(Object.keys(gastoEditar).length > 0){
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
      }
},[])

const ocultarModal = () =>{
    setAnimarModal(false)
    setGastoEditar({})

    setTimeout(()=>{
        setModal(false)
    },500)
}

const handleSubmit =(e)=>{
    e.preventDefault()

    if([nombre,cantidad,categoria].includes('')){
        setMensaje('Todos los campos son obligatorios')
        setTimeout(()=>{
            setMensaje('')
        },1500)
        return
    }

    //Creo el objeto para luego guardarlo como un nuevo gasto
    guardarGasto({id,nombre,cantidad,categoria,fecha})
}

    return(

        <div className="modal">
            <div className="cerrar-modal">
                <img src={CerrarModal} alt="BotonCerrarModal" onClick={ocultarModal}/>
            </div>

            <form  onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
                <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>
                
                <div className='campo'>
                    <label htmlFor="Nombre">Nombre Gasto</label>
                    <input
                    id='nombre' 
                    type="text" 
                    placeholder='Añade el nombre del gasto'
                    value={nombre}
                    onChange = {e => setNombre(e.target.value)}
                    
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="Nombre">Cantidad</label>
                    <input
                    id='cantidad' 
                    type="text" 
                    placeholder='Añadir la cantidad'
                    value = {cantidad}
                    onChange = {e => setCantidad(Number(e.target.value))}

                    />
                </div>

                <div className='campo'>
                    <label htmlFor="Nombre">Categorias</label>
                   
                    <select name="" id="categoria" value={categoria} onChange={e =>{setCategoria(e.target.value)}}>
                        <option value="">--Seleccione--</option>
                        <option value="Ahorro">--Ahorro--</option>
                        <option value="Comida">--Comida--</option>
                        <option value="Casa">--Casa--</option>
                        <option value="Gastos">--Gastos Varios--</option>
                        <option value="Ocio">--Ocio--</option>
                        <option value="Salud">--Salud--</option>
                        <option value="Suscripciones">--Suscripciones--</option>
                        
                    </select>
                </div>

                <input type="submit" 
                       value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir gasto'}/>

            {mensaje && <Mensaje tipoMensaje="error">{mensaje}</Mensaje>}

            </form>

        </div>

    )

}

export default Modal