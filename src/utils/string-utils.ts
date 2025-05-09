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
