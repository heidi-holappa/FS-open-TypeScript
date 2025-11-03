interface exerciseArgs {
    dailyHours: number[];
    target: number;
}


interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}


const parseExerciseArguments = (args: string[]): exerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const exerciseArgs = args.slice(2);

  if (exerciseArgs.every(function(r, v) {return r && !isNaN(Number(v));})) {
    return {
      dailyHours: exerciseArgs.slice(1).map(Number),
      target: Number(exerciseArgs[0])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};



export const calculateExercises = (dailyExerciseHours: number[], target: number): ExerciseResult => {
    // Target cannot be less than or equal to 0 or greater than 24
    if (target <= 0 || target > 24) {
        throw new Error("Target must be between 0 and 24 hours.");
    }

    if (dailyExerciseHours.length === 0) {
        throw new Error("Daily exercises array cannot be empty.");
    }

    const avgTime: number = dailyExerciseHours.reduce((x, y) => x + y) / dailyExerciseHours.length;

    const rating: number = Math.min(3, Math.max(1, Math.floor((avgTime / target) * 3)));

    const ratings: string[] = [
        "Increase exercise",
        "Activity detected, but target not reached.",
        "Target reached. Maintain or decrease exercise"
    ];

    return {
        periodLength: dailyExerciseHours.length,
        trainingDays: dailyExerciseHours.filter(x => x !== 0).length,
        success: target <= avgTime,
        rating: rating,
        ratingDescription: ratings[rating - 1],
        target: target,
        average: avgTime
    };


};


if (require.main === module) {
  try {
    const { dailyHours, target } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}