import CerrarModal from '../img/cerrar.svg'
const Modal = ({setModal,animarModal, setAnimarModal}) =>{

const ocultarModal = () =>{
    setModal(false)
    setAnimarModal(false)

    setTimeout(()=>{
        setModal(false)
    },500)
}

    return(

        <div className="modal">
            <div className="cerrar-modal">
                <img src={CerrarModal} alt="BotonCerrarModal" onClick={ocultarModal}/>
            </div>

            <form className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
                <legend>Nuevo gasto</legend>
            </form>

        </div>

    )

}

export default Modal