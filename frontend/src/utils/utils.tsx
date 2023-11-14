import {decode} from "html-entities";
import htmr from "htmr";
import {ReactNode} from "react";

export function parseHtmlDescription(description: string): ReactNode {
  // Decode escaped HTML characters and add text wrap to pre tags in the question description
  try {
  let decodedDescription = decode(description)
    .replace(/<pre>/g, "<pre style=\"white-space: pre-wrap;\">");
  return htmr(decodedDescription);
  } catch (e) {
    console.log(e)
  }
}

export function parseHtmlDescriptionWithoutExamples(description: string): ReactNode {
  // Decode escaped HTML characters and add text wrap to pre tags in the question description
  try {
  let decodedDescription = decode(description)
    .replace(/<pre>/g, "<pre style=\"white-space: pre-wrap;\">");
  const exampleIndex = decodedDescription?.indexOf("Example");

  const newDescription = exampleIndex !== -1 ? decodedDescription?.substring(0, exampleIndex) : decodedDescription;
  return htmr(newDescription);
  } catch(e) {
    console.log(e)
  }
}
