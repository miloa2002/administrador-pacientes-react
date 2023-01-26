

const Paciente = ({ paciente, handleDelete, handleActualizar }) => {
    const { nombre, fecha, hora, sintoma } = paciente;
    return (
        <div className="w-full space-y-2 bg-gray-100 p-6 rounded-md shadow-md mb-5">
            <p className='font-bold'>Nombre: <span className='font-normal'>{nombre}</span></p>
            <p className='font-bold'>Fecha: <span className='font-normal'>{fecha}</span></p>
            <p className='font-bold'>Hora: <span className='font-normal'>{hora}</span></p>
            <p className='font-bold'>Síntomas: <span className='font-normal'>{sintoma}</span></p>

            <div >
                <button
                    onClick={handleDelete}
                    type='button'
                    className='bg-red-400 py-2 px-6 text-white font-bold'>Eliminar</button>
            </div>
        </div>
    )
}

export default Paciente