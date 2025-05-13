import htmlTags from "html-tags";

export const generateId = (
  component: string,
  element: keyof HTMLElementTagNameMap,
  description: string,
  index?: string,
) => {
  if (!htmlTags.includes(element)) {
    throw new Error(`Invalid HTML tag name: "${element}"`);
  }
  return `${component}-${element}-${description}${index ? "-" + index : ""}`;
};

export const generateTestId = (
  component: string,
  element: keyof HTMLElementTagNameMap,
  description: string,
  index?: string,
) => {
  return `test-${generateId(component, element, description, index)}`;
};

// TODO: Add unit tests
export const toTitleCase = (str: string, space?: boolean) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(space ? " " : "");
};

// TODO: Add unit tests
// TODO: Handle more types thoroughly
export const parseInputValue = <T>(raw: string, type: string): T => {
  if (type === "number") return Number(raw) as T;
  return raw as T;
};
