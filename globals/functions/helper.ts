export const languages = [
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "Go", value: "go" },
  { label: "Ruby", value: "ruby" },
  { label: "C++", value: "cpp" },
  { label: "Markdown", value: "markdown" },
];
export const extractLangauge = (value: string) => {
  const result = languages.find(lan => lan.value === value);
  return result?.label || value || '';
}