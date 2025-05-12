export type User = {
  id: number;
  name: string;
  username: string;
  // Contact
  email: string;
  phone: string;
  website: string;
  // Address
  "address.street": string;
  "address.suite": string;
  "address.city": string;
  "address.zipcode": string;
  // Company
  "company.name": string;
  "company.catchPhrase": string;
  "company.bs": string;
};
