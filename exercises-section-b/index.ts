import express, { Request, Response } from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    if (height === undefined || weight === undefined) {
        // Status code: BAD_REQUEST
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    const heightNum = Number(height);
    const weightNum = Number(weight);

    if (isNaN(heightNum) || isNaN(weightNum)) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    try {
        const bmiResult = calculateBMI(heightNum, weightNum);
        return res.json({
            weight: weightNum,
            height: heightNum,
            bmi: bmiResult
        });

    } catch (error: unknown) {
        return res.status(400).json({ error: error });
  }

});

interface ExerciseRequestBody {
  daily_exercises: number[];
  target: number;
}

/**
 * To test valid case (last line is just to get a prettier output):
curl -X POST 'http://localhost:3003/exercises' \
  -H 'Content-Type: application/json' \
  -d '{"daily_exercises":[1,0,2,0,3,0,2.5],"target":2.5}' \
   | python3 -m json
* To test missing param:
curl -X POST 'http://localhost:3003/exercises' \
  -H 'Content-Type: application/json' \
  -d '{"target":2.5}' \
   | python3 -m json
* To test malformatted param:
curl -X POST 'http://localhost:3003/exercises' \
  -H 'Content-Type: application/json' \
  -d '{"daily_exercises":[1, 0, "a"], "target":2.5}' \
   | python3 -m json
 */
app.post('/exercises', (req: Request, res: Response) => {
  const exercises = req.body as ExerciseRequestBody;

  if (!exercises.daily_exercises || !exercises.target) {
    return res.status(400).json({ error: 'parameters missing'});
  }

  if (isNaN(exercises.target) || !Array.isArray(exercises.daily_exercises) ||
      !exercises.daily_exercises.every(x => !isNaN(x))) {
        return res.status(400).json({ error: 'malformatted parameters'});
  }

  const result = calculateExercises(exercises.daily_exercises,exercises.target);

  return res.json(result);

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});