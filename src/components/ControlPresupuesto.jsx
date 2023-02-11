

const ControlPresupuesto = ({presupuesto, setPresupuesto}) =>{

    const formatearCantidad = (cantidad)=>{
       var formatter = new Intl.NumberFormat('es-ar', {
        
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
      
      })

      return formatter.format(cantidad)
    }

    const cantidadDisponible = (cantidad) =>{



    }

    return (

        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <p>Grafica</p>
            </div>

            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>

                <p>
                    <span>Disponible:</span> {formatearCantidad(0)}
                </p>

                <p>
                    <span>Gastado:</span> {formatearCantidad(0)}
                </p>
            </div>
        </div>

    )
}

export default ControlPresupuesto