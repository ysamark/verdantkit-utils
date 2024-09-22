export const orderNumbers = (
  ...args: Array<number> | [Array<number>]
): Array<number> => {
  let i = 0;

  const numbers = (args[0] instanceof Array ? args[0] : args) as Array<number>;

  const numbersCount = numbers.length;

  for (; i < numbersCount; i++) {
    const history = {
      min: numbers[i],
      minIndex: i,
    };

    for (let n = i; n < numbersCount; n++) {
      if (numbers[n] <= history.min) {
        history.min = numbers[n];
        history.minIndex = n;
      }
    }

    numbers[history.minIndex] = numbers[i];
    numbers[i] = history.min;
  }

  return numbers;
};
