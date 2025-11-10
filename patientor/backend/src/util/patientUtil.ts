import { z } from 'zod';
import { FinnishSSN } from 'finnish-ssn';

import { 
    NewPatientEntry,
    Gender
} from "../types";

export const NewPatientEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
});


const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if (
        'name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object
    ) {
        const newEntry: NewPatientEntry = {
            name: parseStringField(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseStringField(object.occupation)
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

const parseStringField = (stringField: unknown): string => {
    if (!isString(stringField)) {
        throw new Error('Incorrect or missing field');
    }

    return stringField;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};


const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseSSN = (ssn: unknown): string => {
    if (!isString(ssn) ||  !FinnishSSN.validate(ssn)) {
        // We do not return SSN for safety reasons
        throw new Error('Invalid or missing ssn');
    }

    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};


export default {
    toNewPatientEntry
};