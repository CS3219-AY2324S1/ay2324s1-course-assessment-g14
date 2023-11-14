import {decode} from "html-entities";
import htmr from "htmr";
import {ReactNode} from "react";

export function parseHtmlDescription(description: string): ReactNode {
  // Decode escaped HTML characters and add text wrap to pre tags in the question description
  let decodedDescription = decode(description)
    .replace(/<pre>/g, "<pre style=\"white-space: pre-wrap;\">");
  return htmr(decodedDescription);
}