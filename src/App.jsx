import {useState} from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import IconoNuevoGasto from './img/nuevo-gasto.svg'



function App() {
  const [presupuesto, setPresupuesto] = useState(0)
  //Se inicializa el state como false porque la primera vez que carga la app arranca como 0 el presupuesto, ya que no es valido
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)


  const handleNuevoGasto = () =>{
    setModal(true)

    setTimeout(() =>{
      setAnimarModal(true)
    }, 500)
  }

  


  return (
    <div>

      <Header
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
      />

      {isValidPresupuesto && 
      
        <div className='nuevo-gasto'>
          <img  src={IconoNuevoGasto} 
                alt="iconoNuevoGasto"
                onClick={handleNuevoGasto} />
        </div> 

      }
      
      {modal && <Modal 
                setModal={setModal}
                animarModal={animarModal}
                setAnimarModal={setAnimarModal}/>}

    </div>

    
  )
}

export default App
