interface BmiValues {
    heightCm: number;
    weightKg: number;
}


const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightCm: Number(args[2]),
      weightKg: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};



/**
 * Calculates the Body Mass Index (BMI) based on weight and height.
 * @param weightKg - Weight in kilograms.
 * @param heightCm - Height in centimeters.
 * @returns A string representing the BMI category.
 */
export const calculateBMI = (heightCm: number, weightKg: number): string => {
    
    /// let's make crude assumptions about valid ranges
    if (heightCm <= 0 || heightCm > 300) {
        throw new Error("Height must be between 0 and 300 cm.");
    }
    if (weightKg <= 0 || weightKg > 500) {
        throw new Error("Weight must be between 0 and 500 kg.");
    }

    // Convert height from cm to meters
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    
    if (bmi < 16.0) {
        return "Underweight (Severe thinness)";
    } else if (bmi >= 16.0 && bmi < 17.0) {
        return "Underweight (Moderate thinness)";
    } else if (bmi >= 17.0 && bmi < 18.5) {
        return "Underweight (Mild thinness)";
    } else if (bmi >= 18.5 && bmi < 25.0) {
        return "Normal range";
    } else if (bmi >= 25.0 && bmi < 30.0) {
        return "Overweight (Pre-obese)";
    } else if (bmi >= 30.0 && bmi < 35.0) {
        return "Obese (Class I)";
    } else if (bmi >= 35.0 && bmi < 40.0) {
        return "Obese (Class II)";
    } else {
        return "Obese (Class III)";
    }
};


if (require.main === module) {
    try {
        const { heightCm, weightKg } = parseBmiArguments(process.argv);
        console.log(calculateBMI(heightCm, weightKg));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}


