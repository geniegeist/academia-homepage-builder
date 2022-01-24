export type Theme = {
  name: string;
  css: string;
  defaultText: string;
  generateHTML: (content: string) => string;
  generateCSS: (config?: any) => string;
};
