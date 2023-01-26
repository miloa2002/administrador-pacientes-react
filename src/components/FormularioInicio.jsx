import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import generarId from "../helpers/generarId";
import Paciente from "./Paciente";

const FormularioInicio = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [pacientes, setPacientes] = useState([]);

    async function obtenerData() {
        try {
            const data = await axios.get("http://localhost:3000/pacientes")
            setPacientes(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerData();
    }, [])

    const onSubmit = async (dataForm, e) => {
        e.preventDefault();
        const agregarPaciente = {
            nombre: dataForm.nombre,
            fecha: dataForm.date,
            hora: dataForm.time,
            sintoma: dataForm.sintomas,
            id: generarId()
        }

        try {
            await axios.post("http://localhost:3000/pacientes", agregarPaciente)
            setPacientes([agregarPaciente, ...pacientes])

        } catch (error) {
            console.log(error);
        }
        reset();
    }

    const handleDelete = async (paciente) => {
        try {
            await axios.delete(`http://localhost:3000/pacientes/${paciente.id}`)
            setPacientes(pacientes.filter(e => e.id !== paciente.id))

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="md:flex h-screen justify-between mt-20">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='md:w-1/3 mx-auto p-8'
            >
                <legend className='mb-5 text-center font-bold text-2xl text-blue-400'>Crea cita médica</legend>
                <label htmlFor="nombre" className='text-gray-500 font-bold'>Nombre del paciente</label>
                {errors.nombre && <p className="bg-red-400 p-2 mt-2 text-white font-bold">El campo nombre es obligatorio</p>}
                <input
                    id='nombre'
                    {...register("nombre", { required: true })}
                    type="text"
                    placeholder='Nombre del paciente'
                    className='block w-full text-left bg-gray-100 p-4 rounded-md mb-6 outline-none placeholder-gray-500 font-bold border-l-8 border-blue-400 mt-4'
                />
                <label htmlFor="date" className='text-gray-500 font-bold'>Fecha de la cita</label>
                {errors.date && <p className="bg-red-400 p-2 mt-2 text-white font-bold">El campo fecha es obligatorio</p>}
                <input
                    id='date'
                    {...register("date", { required: true })}
                    type="date"
                    placeholder='Fecha de la cita'
                    className='block w-full text-left bg-gray-100 p-4 rounded-md mb-6 outline-none placeholder-gray-500 font-bold border-l-8 border-blue-400 mt-4'
                />
                <label htmlFor="time" className='text-gray-500 font-bold'>Hora de la cita</label>
                {errors.time && <p className="bg-red-400 p-2 mt-2 text-white font-bold">El campo hora es obligatorio</p>}
                <input
                    id='time'
                    {...register("time", { required: true })}
                    type="time"
                    placeholder='Hora de la cita'
                    className='block w-full text-left bg-gray-100 p-4 rounded-md mb-6 outline-none placeholder-gray-500 font-bold border-l-8 border-blue-400 mt-4'
                />
                <label htmlFor="sintomas" className='text-gray-500 font-bold'>Síntomas</label>
                {errors.sintomas && <p className="bg-red-400 p-2 mt-2 text-white font-bold"> El campo sintomas es obligatorio</p>}
                <textarea
                    id="sintomas"
                    {...register("sintomas", { required: true })}
                    className='block w-full text-left bg-gray-100 p-4 rounded-md mb-6 outline-none placeholder-gray-500 font-bold border-l-8 border-blue-400 mt-4'
                >
                </textarea>
                <input
                    type="submit"
                    value="Crear cita"
                    className=' w-full text-center p-4 rounded-full bg-blue-400 font-bold uppercase text-white tracking-[.15em] hover:bg-blue-500 hover:cursor-pointer'
                />
            </form >


            <div className='md:w-1/3 mx-auto md:h-screen overflow-y-scroll p-8'>
                <h1 className='mb-5 text-center font-bold text-2xl text-blue-400'>{pacientes.length <= 0 ? "No hay pacientes" : "Administra tus pacientes"}</h1>
                {pacientes.map(paciente => <Paciente
                    paciente={paciente}
                    handleDelete={() => handleDelete(paciente)}
                    handleActualizar={() => handleActualizar(paciente)}
                    key={paciente.id} />)}
            </div>
        </div>
    )
}

export default FormularioInicio
