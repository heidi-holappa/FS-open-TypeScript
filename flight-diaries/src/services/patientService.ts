import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
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
    getNonSensitiveEntries,
    addPatient
};