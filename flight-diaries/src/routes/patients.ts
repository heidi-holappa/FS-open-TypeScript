import express, { Response } from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatientEntry } from '../types';


const router = express.Router();

router.get('/', (_reg, res: Response<NonSensitivePatientEntry[]>) =>{
    res.send(patientService.getNonSensitiveEntries());
});

export default router;