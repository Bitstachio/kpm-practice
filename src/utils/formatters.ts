export const formatPhoneNumber = (raw: string): string => {
  const cleaned = raw.replace(/[^\dxext]/gi, "");
  const extMatch = cleaned.match(/(ext|x)(\d{1,5})$/i);
  const extension = extMatch ? extMatch[2] : null;
  const numberPart = cleaned.replace(/(ext|x)\d{1,5}$/i, "");
  const digitsOnly = numberPart.startsWith("1") && numberPart.length > 10 ? numberPart.slice(1) : numberPart;
  const match = digitsOnly.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (!match) {
    throw new Error("Invalid phone number format.");
  }
  const formatted = `(${match[1]}) ${match[2]}-${match[3]}`;
  return extension ? `${formatted} x${extension}` : formatted;
};
