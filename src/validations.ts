export const validAngolanPhoneNumber = (phoneNumber: string): boolean => {
  const re = /^((\+?244)?9[12345]([0-9]{7}))$/;

  return re.test(phoneNumber);
};

export const validCardNumber = (cardNumber: string) => {
  const numberRe = /^([0-9]+)$/;

  const cardTypesRegExes = [
    /^4[0-9]{12}(?:[0-9]{3})?$/,
    /^5[1-5][0-9]{14}$/,
    /^3[47][0-9]{13}$/,
    /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  ];

  if (!numberRe.test(cardNumber)) {
    return false;
  }

  for (const cardTypesRegEx of cardTypesRegExes) {
    if (cardTypesRegEx.test(cardNumber)) {
      return true;
    }
  }

  return false;
};
