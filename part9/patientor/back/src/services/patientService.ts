import patientEntries from "../../data/patientsData";
import { NewPatient, Patient } from "../types";
import {v4 as uuid} from 'uuid'

const getPatients = (): Omit<Patient, 'ssn'>[] => {
    return patientEntries.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }))
}

const addPatient = ( newPatient: NewPatient): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...newPatient
    }

    patientEntries.push(newPatientEntry)
    return newPatientEntry
}

const getPatient = (id: string): Patient | any => {
    const patient = patientEntries.find(patient => patient.id === id)
    if(patient) return patient
    else throw new Error(`Patient with id: ${id} does not exist`)
}

export default {getPatients, addPatient, getPatient}