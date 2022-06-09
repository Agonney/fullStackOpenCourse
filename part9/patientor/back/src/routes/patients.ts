import express from "express";
import patientService from "../services/patientService";
import utils from "../utils";
const router = express.Router()

router.get('/', (_req, res) => {
    return res.send(patientService.getPatients())
})

router.post('/', (req, res) => {
    try{
        const newPatient = utils.toNewPatient(req.body)
        const addedPatient = patientService.addPatient(newPatient)
        res.json(addedPatient)
    }
    catch(error){
        let errorMessage = 'Something went wrong.'
        if(error instanceof Error){
            errorMessage += ' Error: ' + error.message
        }
        res.status(400).send(errorMessage)
    }
})

router.get('/:id', (req, res) => {
    try{
        const patient = patientService.getPatient(req.params.id)
        res.json(patient)
    }
    catch(error){
        let errorMessage = 'Something went wrong.'
        if(error instanceof Error){
            errorMessage += ' Error: ' + error.message
        }
        res.status(400).send(errorMessage)
    }
})

export default router