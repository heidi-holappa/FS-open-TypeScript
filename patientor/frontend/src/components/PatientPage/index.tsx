import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';

import { apiBaseUrl } from '../../constants';
import { Box, Typography, List, ListItem } from '@mui/material';

import { Patient, Diagnosis, Entry } from '../../types';




const PatientPage = () => {
    const { id } = useParams<{ id: string}>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [diagnosisErrorMsg, setDiagnosisErrorMsg] = useState<string | null>(null);


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

    
    useEffect(() => {

        const fetchDiagnoses = async () => {
            try {
                const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
                setDiagnoses(data);
            } catch (error) {
                setDiagnosisErrorMsg(`Failed to fetch diagnosis names. Error: ${error}`);
            }
        };
        void fetchDiagnoses();
    }, []);


    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const common = <div key={entry.id}>
                        <Typography><i>{entry.description}</i></Typography>
                        {entry.diagnosisCodes ? (
                            <ul>
                                {entry.diagnosisCodes.map((code) => {
                                    const name = diagnoses?.find(d => d.code === code)?.name;
                                    return <li key={code}>{code}{name ? ` ${name}` : ''}</li>;
                                })}
                            </ul>
                        ) : null}
                        Diagnosis by {entry.specialist}
                    </div>;
    
    
        switch (entry.type) {
            case "Hospital":
                return (
                <div>
                    <Typography>{entry.date} {<LocalHospitalIcon />}</Typography>
                    {common}
                </div>
            );
            case "OccupationalHealthcare":
                return (
                <div>
                    <Typography>{entry.date} {<WorkIcon />} {entry.employerName}</Typography>
                    {common}
                </div>
            );
            case "HealthCheck":
                return (
                <div>
                    <Typography>{entry.date} {<MedicalServicesIcon />}</Typography>
                    {common}
                </div>
            );
            default:
                return <div>Unknown Entry</div>;
        }

    };



    if (errorMsg) {
        return <Typography color='error'>{errorMsg}</Typography>;
    }

    if (diagnosisErrorMsg) {
        return <Typography color='error'>{diagnosisErrorMsg}</Typography>;
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
            
                {patient.entries && patient.entries.length > 0 && diagnoses ? (
                    patient.entries.map((entry) => (
                        <Box sx={{ border: 1, m: 2 }}>
                            <EntryDetails entry={ entry } />
                        </Box>
                    ))
                ) : (
                    <Typography>No entries</Typography>
                )}
        </Box>
    );
};



export default PatientPage;