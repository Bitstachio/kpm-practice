// TODO: Add unit tests
export const validateEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const pattern = /^(\+?\d{1,3}[\s-]?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}(\s*(ext\.?|x)\s*\d{1,5})?$/i;
  return pattern.test(phone.trim());
};
