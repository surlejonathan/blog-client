import parse from "html-react-parser";

export const getText = (html) => {
  if (html) return parse(html);
};
