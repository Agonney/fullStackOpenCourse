import patientEntries from "../../data/patientsData";
import { NewPatient, Patient } from "../types";
import {v4 as uuid} from 'uuid'

const getPatients = (): Omit<Patient, 'ssn'>[] => {
    return patientEntries.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
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

export default {getPatients, addPatient}