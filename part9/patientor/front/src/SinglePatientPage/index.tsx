import { Box, Typography } from "@material-ui/core"
import axios from "axios"
import React from "react"
import { useParams } from "react-router-dom"
import { apiBaseUrl } from "../constants"
import { setPatient, useStateValue } from "../state"
import { Gender, Patient } from "../types"
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransIcon from '@mui/icons-material/Transgender'

const SinglePatientPage = () => {
    const [{patient}, dispatch] = useStateValue()
    const {id} = useParams<{id: string}>()
    React.useEffect(() =>{
        console.log('i fire once');
        const fetchPatient = async () => {
            try{
                const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
                dispatch(setPatient(patient))
            }
            catch(error){
                console.log(error)
            }
        }
        if(!patient) fetchPatient()
    }, [dispatch])

    const icon = (gender: Gender | undefined) => {
        switch(gender){
            case Gender.Male: 
                return <MaleIcon fontSize="large"/>
            case Gender.Female:
                return <FemaleIcon fontSize="large"/>
            case Gender.Other:
                return <TransIcon fontSize="large"/>
            default:
                return <></>
        }
    }

    return(
        <div className="app">
            <Box>
                <Typography variant="h4" style={{ marginTop: "0.5em" }}>    
                    {patient?.name} {icon(patient?.gender)}
                </Typography>
                <Typography variant="subtitle1">ssn: {patient?.ssn}</Typography>
                <Typography variant="subtitle1">occupation: {patient?.occupation}</Typography>
            </Box>
        </div>
    )
}

export default SinglePatientPage