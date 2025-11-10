
import { z } from 'zod';
import { NewEntrySchema } from './utils';
import { NewPatientEntrySchema } from './util/patientUtil';


export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {

}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries?: Entry[];
}


export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
// infer the type from schema
export type NewDiaryEntry = z.infer<typeof NewEntrySchema>; 

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
// export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;