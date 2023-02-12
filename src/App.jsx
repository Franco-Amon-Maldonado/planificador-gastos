import {useState, useEffect} from 'react'
import Filtro from './components/Filtro'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { idGenerator } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'



function App() {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto') ?? 0))
  //Se inicializa el state como false porque la primera vez que carga la app arranca como 0 el presupuesto, ya que no es valido
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos,setGastos] = useState([...(JSON.parse(localStorage.getItem('gastos'))?? [])])

  const [gastoEditar, setGastoEditar] = useState({})

  const[filtro,setFiltro] = useState('')

  const [gastosFiltrados, setGastosFiltrados] = useState([])

  //Va a estar escuchando por los gastos a editar
  useEffect(()=>{
      if(Object.keys(gastos).length > 0){
        setModal(true)

      setTimeout(() =>{
        setAnimarModal(true)
      }, 500)
    }
  },[gastoEditar])

  //Local storage del presupuesto
  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])

  useEffect(()=>{
    const presupuestoLs = Number(localStorage.getItem('presupuesto')) ?? 0
    if(presupuestoLs > 0){
      setIsValidPresupuesto(true)
    }
  },[])

  //Local storage de los gastos
  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
    setModal(false)
  },[gastos])

  useEffect(()=>{
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  //Funcion para abrir el modal al presionar el boton nuevo gasto
  const handleNuevoGasto = () =>{
    setModal(true)
    setGastoEditar({})

    setTimeout(() =>{
      setAnimarModal(true)
    }, 500)
  }

  //Funcion para guardar los nuevos gastos
  const guardarGasto = (gasto) =>{
    if(gasto.id) {          //Cuando el gasto state sea igual al gasto id que se pasa por parametro entonces retorna el gasto porque este va a ser el objeto actualizado si no retorna lo que este en el state
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados)
      //Limpia el state, ya que al actualizarlo quedaba el objeto antiguo cargado
      setGastoEditar({})
    }else{
      //Retorno la fecha con la que se genera el objeto
      gasto.fecha = Date.now()
      gasto.id = idGenerator()
      setGastos([...gastos, gasto])
    }
    
    
    //Cierro el modal
    setAnimarModal(false)
    setTimeout(()=>{
        setModal(false)
    },500)
  }

  const eliminarGasto = (id) => {
    const gastoEliminado = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastoEliminado)
  }

  return (
    <div className={modal ? 'fijar' : null}>

      <Header
        
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && 
        <>
        <main>
          <Filtro
            filtro={filtro}
            setFiltro={setFiltro}
          />
          <ListadoGastos
            gastos={gastos}
            setGastoEditar = {setGastoEditar}
            eliminarGasto= {eliminarGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />
        </main>

         <div className='nuevo-gasto'>
          <img  src={IconoNuevoGasto} 
                alt="iconoNuevoGasto"
                onClick={handleNuevoGasto} />
        </div> 
        </>
       

      }
      
      {modal && <Modal 
                setModal={setModal}
                animarModal={animarModal}
                setAnimarModal={setAnimarModal}
                guardarGasto={guardarGasto}
                gastoEditar= {gastoEditar}
                setGastoEditar = {setGastoEditar}
                />}

    </div>

    
  )
}

export default App
