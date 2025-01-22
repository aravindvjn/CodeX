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

export const formatDate = (value: string) => {
  const date = new Date(value);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};


export const timeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);

  const secondsAgo = Math.floor((now.getTime() - past.getTime()) / 1000);

  const minutes = Math.floor(secondsAgo / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (secondsAgo < 60) {
    return `${secondsAgo}sec`;
  } else if (minutes < 60) {
    return `${minutes}min`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 7) {
    return `${days}d`;
  } else {
    return `${weeks}w`;
  }
}