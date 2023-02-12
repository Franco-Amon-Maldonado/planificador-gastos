import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"


const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto,setIsValidPresupuesto}) =>{
   const [disponible, setDisponible] = useState(0);
   const [gastado, setGastado] = useState(0);
   const [porcentaje,setPorcentaje] = useState(0);

    //Escucha por los cambios que sucedan en gastos
    useEffect(() =>{
        const totalGastado = gastos.reduce((total,gasto)=>{
            return gasto.cantidad + total
        },0)

        const totalDisponible = presupuesto - totalGastado

        const nuevoPorcentaje = ((presupuesto-totalDisponible)/presupuesto) * 100
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        

        setTimeout(()=>{
            setPorcentaje(nuevoPorcentaje)
        },1000)

    }, [gastos])


    const formatearCantidad = (cantidad)=>{
        var formatter = new Intl.NumberFormat('es-ar', {
        
            style: 'currency',
                currency: 'ARS',
            minimumFractionDigits: 2
      
      })

      return formatter.format(cantidad)
    }

    const colorProgressBar = (porcentajeColor) =>{
        if (porcentajeColor < 30) {
            return '#83bc4c';
          } else if (porcentajeColor >= 30 && porcentajeColor < 60) {
            return '#faa31a';
          } else {
            return "#ba3d3d";
          }
    }

    const handleResetear = () =>{
        const confirmar = confirm('Desea reiniciar la app?')
        if(confirmar){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
        
    }

    return (

        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <p>{<CircularProgressbar 
                        text={porcentaje >= 100 ? 'Sin presupuesto' : `Gastado ${porcentaje}%`}
                        styles={buildStyles({
                            pathColor:colorProgressBar(porcentaje),
                              
                        })}
                        value={porcentaje}/>}
                
                </p>
            </div>

            <div className="contenido-presupuesto">
                <button 
                    className="reset-app"
                    onClick={handleResetear}> Resetear app</button>
                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible:</span> {formatearCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>

    )
}

export default ControlPresupuesto