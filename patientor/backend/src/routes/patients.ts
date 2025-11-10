import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import { NonSensitivePatientEntry, NewPatientEntry, PatientEntry } from '../types';

import { NewPatientEntrySchema } from '../util/patientUtil';

const router = express.Router();

router.get('/', (_reg, res: Response<NonSensitivePatientEntry[]>) =>{
    res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req: Request<{ id: string }>, res: Response<PatientEntry>) => {
    const patient = patientService.getEntries(req.params.id);
    if (patient) {
        res.send({ ...patient, entries: patient.entries ?? [] });
    } else {
        res.sendStatus(404);
    }
});


const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPatientEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const addedEntry = patientService.addPatient(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;