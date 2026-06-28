import process from "process";

export function calculateBmi(height: number, weight: number): string {
  if (isNaN(height) || isNaN(weight)) {
    console.log(`provide Valid numbers `);
    process.exit(1);
  }
  const heightInMeters = height / 100;
  const BMI = weight / (heightInMeters * heightInMeters);

  if (BMI < 18.5) return "Underweight";
  if (BMI < 25.0) return "Normal range";
  if (BMI < 30.0) return "Overweight";
  return "Obese";
}

if (process.argv[1] === import.meta.filename) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  if (isNaN(height) || isNaN(weight)) {
    console.log(`provide Valid numbers `);
    process.exit(1);
  }
  console.log(calculateBmi(height, weight));
}
