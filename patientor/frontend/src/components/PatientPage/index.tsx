import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import { apiBaseUrl } from '../../constants';
import { Box, Typography, List, ListItem } from '@mui/material';

import { Patient } from '../../types';


const PatientPage = () => {
    const { id } = useParams<{ id: string}>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);


    useEffect(() => {
        const fetchPatient = async () => {
            if (!id) return;
            try {
                const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                setPatient(data);
            } catch (error) {
                setErrorMsg(`Failed to fetch patient ${id}. Error: ${error}`);
            }
        };
        void fetchPatient();
    }, [id]);


    if (errorMsg) {
        return <Typography color='error'>{errorMsg}</Typography>;
    }

    if (!patient) {
        return <Typography>Loading data (maybe Spinner here?)... </Typography>;
    }

    return (
        <Box>
            <Typography variant="h5" style={{ marginTop: 16 }}>{patient.name}</Typography>
            <Typography>Gender: {patient.gender}</Typography>
            <Typography>SSN: {patient.ssn}</Typography>
            <Typography>Occupation: {patient.occupation}</Typography>

            <Typography variant="h5">Entries</Typography>
            {patient.entries && patient.entries.length > 0 ? (

                patient.entries.map((entry) => (
                    <div key={entry.id}>
                        <Typography>{entry.date} <i>{entry.description}</i></Typography>
                        {entry.diagnosisCodes ? (
                            <ul>
                                {entry.diagnosisCodes.map((code) => (
                                    <li key={code}>{code}</li>))}
                            </ul>
                        ) : null}
                    </div>
                ))
            ) : (
                <Typography>No entries</Typography>
            )}
        </Box>
    );
};



export default PatientPage;