import { create } from 'zustand';
import { DraftPatient, Patient } from './types';
import {v4 as uuidv4} from 'uuid';
import {createJSONStorage, devtools, persist} from "zustand/middleware";

type PatientState = {
    patients: Patient[],
    activeId: Patient['id']
    addPatient: (data: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    updatePatient: (data: DraftPatient) => void
}
const createPatient = (patient: DraftPatient): Patient => {
    return {...patient, id: uuidv4()}
}

export const usePatientStore = create<PatientState>()(
    devtools(
        persist((set) => ({
    patients: [],
    activeId: '',
    addPatient: (data) => {
        // se toma el pacientse para retornarle un id con uuid
        const newPatient = createPatient(data)
        set((state) => ({
            // una copia para no perder lo almacenado
            patients: [...state.patients, newPatient]
        }))
    },
    deletePatient: (id) => {
        console.log(id)
        set((state) => ({
            // se elimina el item por el id
            patients: state.patients.filter(patient => patient.id !== id)
        }))
    },
    getPatientById: (id) => {
        console.log(id)
        set(() => ({
            activeId: id
        }))
    },
        updatePatient: (data) => {
            set((state) => ({
                patients: state.patients.map(patient => patient.id === state.activeId ? {id: state.activeId, ...data} : patient),
                activeId: ''
            }))
        }
    }), {
    name: 'patient-storage',
    storage: createJSONStorage(() => localStorage)
        })
    ))