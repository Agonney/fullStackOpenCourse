import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String
}

const parseName = (name: unknown): string => {
    if(!name || !isString(name)){
        throw new Error('Incorrect or missing name')
    }

    return name
}

const parseSSN = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)){
        throw new Error('Incorrect or missing ssn')
    }

    return ssn
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const parseDOB = (dateOfBirth: unknown): string => {
    if(!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
        throw new Error('Incorrect or missing date of birth')
    }

    return dateOfBirth
}

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)){
        throw new Error('Incorrect or missing occupation')
    }

    return occupation
}

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param)
}

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)){
        throw new Error('Incorrect or missing gender '+gender)
    }

    return gender
} 


const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        ssn: parseSSN(object.ssn),
        dateOfBirth: parseDOB(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        entries: object.entries
    } 

    return newPatient
}

export default {toNewPatient}