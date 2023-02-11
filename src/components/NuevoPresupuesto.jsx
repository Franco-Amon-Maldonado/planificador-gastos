import { useState} from "react"
import Mensaje from "./Mensaje"


const NuevoPresupuesto = ({presupuesto, setPresupuesto}) =>{
    const [mensaje, setMensaje] = useState('')
    
    const handlePresupuesto = (e) => {
        e.preventDefault()

    if(!presupuesto || presupuesto < 0){
        setMensaje('No es un presupuesto válido')
        return
    }   

    setMensaje('')

}


    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form onSubmit ={handlePresupuesto} className="formulario">
                <div className="campo">
                    <label>Presupuesto inicial</label>
                    <input 
                        type="number"
                        className="nuevo-presupuesto"
                        placeholder="Añade un presupuesto"
                        value={presupuesto}
                        onChange={e => setPresupuesto(e.target.value)}
                    />
                </div>
                <input type="submit" value="Añadir"/>

                {mensaje && <Mensaje tipoMensaje="error">{mensaje}</Mensaje>}
            </form>
        </div>
    )


}

export default NuevoPresupuesto