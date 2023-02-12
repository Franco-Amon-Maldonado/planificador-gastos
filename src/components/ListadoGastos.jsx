import Gasto from "./Gasto"


const ListadoGastos = ({gastos, setGastoEditar,eliminarGasto,filtro,gastosFiltrados})=> {

    return (

        <div className="listado-gastos contenedor">
            
            
            {   //Si hay un filtro defino se itera por los gastosFiltrados si no sobre todos los gastos
                filtro ? (
                    <>
                    <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos aún'}</h2>
                        {gastosFiltrados.map( gasto => (
                        <Gasto

                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto= {eliminarGasto}
                        />
                        ))}
                    </>
                ) : (
                    <>
                    <h2>{gastos.length ? 'Gastos' : 'No hay gastos aún'}</h2>
                        {gastos.map(gasto => (
                        
                            <Gasto

                                key={gasto.id}
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto= {eliminarGasto}
                            />
                        
                        ))}
                    </>
                    )
                    
            }   

            
        </div>
    )
}

export default ListadoGastos