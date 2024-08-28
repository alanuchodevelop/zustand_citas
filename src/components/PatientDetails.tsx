import { Patient } from "../types";
import PatientDetailsItem from "./PatientDetailsItem";
import { usePatientStore } from "../store";
import {toast} from "react-toastify";
type PatientDetailsProps = {
    patient: Patient
}
export default function PatientDetails({patient}: PatientDetailsProps) {
    
    const deletePatient = usePatientStore((state) => state.deletePatient)
    const editPatient = usePatientStore((state) => state.getPatientById)

    const handleClick = () => {
        deletePatient(patient.id)
        toast('Paciente eliminado',{
            type: 'error'
        } )
    }
    
    return(
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            
            <PatientDetailsItem
                label="ID"
                data={patient.id}
            />
            <PatientDetailsItem
                label="NOMBRE"
                data={patient.name}
            />
            <PatientDetailsItem
                label="DUEÑO"
                data={patient.caretaker}
            />
            <PatientDetailsItem
                label="EMAIL"
                data={patient.email}
            />
            <PatientDetailsItem
                label="FECHA ALTA"
                data={patient.date.toString()}
            />
            <PatientDetailsItem
                label="SINTOMAS"
                data={patient.symptoms}
            />
            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button className="py-2 px-10 bg-indigo-600 hover:bg-slate-700 text-white font-bold uppercase rounded-lg"
                onClick={() => editPatient(patient.id)} 
                >
                    Editar
                </button>
                <button className="py-2 px-10 bg-red-600 hover:bg-slate-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => handleClick()}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}