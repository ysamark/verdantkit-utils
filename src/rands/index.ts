export const range = (min: number, max: number): Array<number> => {
  const arr: Array<number> = [];

  for (; min <= max; min++) {
    arr.push(min);
  }

  return arr;
};

export const rand = (min: number, max: number): number => {
  return randFromRange(range(min, max));
};

export const randFromRange = (numberRange: Array<number>): number => {
  return numberRange[Math.round(Math.random() * (-1 + numberRange.length))];
};
