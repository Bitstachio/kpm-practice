// TODO: Add unit tests
export const validateEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};
