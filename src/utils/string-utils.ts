import htmlTags from "html-tags";

export const generateTestId = (component: string, element: keyof HTMLElementTagNameMap, description: string, index?: string) => {
  if (!htmlTags.includes(element)) {
    throw new Error(`Invalid HTML tag name: "${element}"`);
  }
  return `test-${component}-${element}-${description}${index ? "-" + index : ""}`;
};
