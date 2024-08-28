export type Patient = {
    id: string
    name: string
    caretaker: string
    email: string
    date: Date
    symptoms: string
}

// omite el id del type de paciente
export type DraftPatient = Omit<Patient, 'id'>