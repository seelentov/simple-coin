export const calculatePercentage = (min, max, number) => {
  const range = max - min;
  const value = number - min;
  const percentage = (value / range) * 100;

  return percentage;
}