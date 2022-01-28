import { injectCSSFile, CSSConfig, Theme } from './theme';

function cssConfig(): CSSConfig[] {
  return [{
    declaration: `
      font-family: 'Lora', serif;
      line-height: 1.5;
    `,
  }, {
    selector: 'h1',
    declaration: `
      font-size: 2rem;
      font-weight: 500;
      line-height: 2;
      margin: 0;
      padding: 0;
    `,
  }, {
    selector: 'h2, h3, h4, h5, h6',
    declaration: `
      margin: 0;
      padding: 0;
      color: #a81010;
      font-weight: 500;
      line-height: 2;
  `,
  }, {
    selector: 'h2',
    declaration: `
      font-size: 1.7rem;
  `,
  }, {
    selector: 'h3',
    declaration: `
      font-size: 1.5rem;
  `,
  }, {
    selector: 'h4',
    declaration: `
      font-size: 1.3rem;
  `,
  }, {
    selector: 'h5',
    declaration: `
      font-size: 1.2rem;
  `,
  }, {
    selector: 'h6',
    declaration: `
      font-size: 1.1rem;
  `,
  }, {
    selector: 'p',
    declaration: `
      font-size: 1rem;
  `,
  }, {
    selector: 'code',
    declaration: `
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
      color: #d63384;
      font-size: 0.875rem;
      word-wrap: break-word;
    `,
  }];
}

const defaultText = `# Marius Hoffmann

![](https://images.unsplash.com/photo-1502101872923-d48509bff386?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80)
  
## About Me
  
I have been a PhD student at [Berkeley](https://math.berkeley.edu) since April 2013. Previously, I did my undergraduate at [Emory](https://www.math.emory.edu/home/).
  
## Contact Me
  
You can email me at [dexter@math.harvard.edu](mailto:dexter@math.harvard.edu). My office is at 531.
  
## Hairer's Reconstruction Theorem Without Regularity Structure $(F_x)_{x \\in \\mathbb R^d}$
  
A preprint can be found at [arxiv](https://arxiv.org).

## Papers
    
- [Spectral theorem of synthetic operators (pdf)](https://www.google.de)
- [Newton's maxtrix decomposition $SV_{\\lambda}$](https://www.google.de)
- [Lindelöf-Locatelli Theorem (pdf)](https://www.google.de)
`;

function generateHTML(content: string): string {
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>TITLE</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="stylesheet.css">
    <link rel="preconnect" href="https://fonts.googleapis.com"> 
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> 
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Marcellus+SC&display=swap" rel="stylesheet">
  </head>
  <body>
  <div class="wrapper">
  ${content}
  </div>
  </body>
  </html>
  `;
  return html;
}

function generateCSS(): string {
  const css = `html {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    font-size: 1.1rem;
  }
  
  img {
    width: 100%;
  }

  ${injectCSSFile(cssConfig(), '.wrapper', `
    margin-top: 1rem;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
  `, `@media (min-width: 576px) {
    .wrapper {
      width: 500px;
    }
  }

  @media (min-width: 768px) {
    .wrapper {
      width: 640px;
    }
  }`)}

  `;

  console.log(css);

  return css;
}

const theme: Theme = {
  name: 'dexter',
  defaultText,
  css: cssConfig,
  generateHTML,
  generateCSS,
};

export default theme;
