interface ExerciseSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type RatingDescription =
  | "Great Job"
  | "Not too bad but could be better"
  | "Needs improvement";
export function calculateExercise(
  targetExercise: number,

  dailyExerciseHours: number[],
): ExerciseSummary | void {
  const periodLength: number = dailyExerciseHours.length;
  const trainingDays: number[] = dailyExerciseHours.filter((days) => days > 0);
  const average: number =
    dailyExerciseHours.reduce((acc, currVal) => acc + currVal, 0) /
    periodLength;
  const success: boolean = average >= targetExercise;
  const rating: number = success ? 3 : average >= targetExercise * 0.8 ? 2 : 1;

  const description: Record<number, RatingDescription> = {
    1: "Needs improvement",
    2: "Not too bad but could be better",
    3: "Great Job",
  };
  return {
    average,
    periodLength: dailyExerciseHours.length,
    rating,
    target: targetExercise,
    trainingDays: trainingDays.length,
    success,
    ratingDescription: description[rating],
  };
}

if (process.argv[1] === import.meta.filename) {
  const target = Number(process.argv[2]);
  const dailyHours = process.argv.slice(3).map(Number);
  console.log(calculateExercise(target, dailyHours));
}
