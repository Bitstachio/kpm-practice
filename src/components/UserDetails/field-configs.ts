import { validateEmail, validatePhoneNumber } from "../../utils/validators.ts";
import { formatLowerCase, formatPhoneNumber } from "../../utils/formatters.ts";
import type { User } from "../../types/user-types.ts";

export type EditableFieldConfig = {
  [K in keyof User]: {
    type: "text" | "number" | "email" | "tel" | "";
    field: K;
    label?: string;
    validator?: (value: User[K]) => boolean;
    formatter?: (value: User[K]) => User[K];
  };
}[keyof User];

export const fieldConfigsContact: EditableFieldConfig[] = [
  {
    type: "text",
    field: "username",
  },
  {
    type: "text",
    field: "name",
  },
  {
    type: "email",
    field: "email",
    validator: validateEmail,
    formatter: formatLowerCase,
  },
  {
    type: "tel",
    field: "phone",
    validator: validatePhoneNumber,
    formatter: formatPhoneNumber,
  },
  {
    type: "text",
    field: "website",
    formatter: formatLowerCase,
  },
];

export const fieldConfigsAddress: EditableFieldConfig[] = [
  {
    type: "text",
    field: "address.street",
  },
  {
    type: "text",
    field: "address.suite",
  },
  {
    type: "text",
    field: "address.city",
  },
  {
    type: "text",
    field: "address.zipcode",
    label: "Zip Code",
  },
];

export const fieldConfigsCompany: EditableFieldConfig[] = [
  {
    type: "text",
    field: "company.name",
  },
  {
    type: "text",
    field: "company.catchPhrase",
  },
  {
    type: "text",
    field: "company.bs",
    label: "Business Slogan",
  },
];
