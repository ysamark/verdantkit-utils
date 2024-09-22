export const fakeStr = (): string => {
  const data = JSON.parse(`
        {
          "prop": 4
        }
      `);

  return data.prop;
};
