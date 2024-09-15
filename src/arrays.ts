export const arraySplit = <ArrayItemsType = unknown>(
  array: Array<ArrayItemsType>,
  itemsPerSlice: number = 1
): Array<Array<ArrayItemsType>> => {
  const finalArray: Array<Array<ArrayItemsType>> = [];

  for (let i = 0; i < array.length; i += itemsPerSlice) {
    let n = 0;
    const arr = [];

    for (; n < itemsPerSlice; n++) {
      const currentItemIndex = i + n;

      if (array.length - 1 >= currentItemIndex) {
        arr.push(array[currentItemIndex]);
      }
    }

    finalArray.push(arr);
  }

  return finalArray;
};

export const arrayMerge = <ArrayItemsType = unknown>(
  ...arrays: Array<Array<ArrayItemsType>>
): Array<ArrayItemsType> => {
  let finalArray: Array<ArrayItemsType> = [];

  arrays.forEach((array) => {
    finalArray = [...finalArray, ...array];
  });

  return finalArray;
};
