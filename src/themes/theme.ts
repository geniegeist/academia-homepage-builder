export type Theme = {
  css: string;
  defaultText: string;
  generateHTML: (content: string) => string;
  generateCSS: (config?: any) => string;
};
