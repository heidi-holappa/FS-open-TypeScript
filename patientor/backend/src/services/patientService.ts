import { v1 as uuid } from 'uuid';
import patients from '../../data/patientsV2';
import { 
    NonSensitivePatientEntry,
    PatientEntry,
    NewPatientEntry
} from '../types';


const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getEntries = (id: string): PatientEntry | undefined => {
    return patients.find(p => p.id === id);
};


const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
    const id = uuid();
    const newPatientEntry = {
        id,
        ...entry

    };

    patients.push(newPatientEntry);
    return newPatientEntry;

};



export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
};