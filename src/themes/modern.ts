import { injectCSSFile, Theme, CSSConfig } from './theme';

function cssConfig(): CSSConfig[] {
  return [{
    declaration: `line-height: 1.5;
  color: rgba(41,41,41,1);`,
  }, {
    selector: 'hr',
    declaration: 'margin: 1em 0;',
  }, {
    selector: 'h1, h2, h3, h4, h5, h6',
    declaration: `text-align: center;
  line-height: 2;`,
  }, {
    selector: 'h1, h2, h3, h4',
    declaration: 'font-weight: bold;',
  }, {
    selector: 'h1',
    declaration: `font-weight: bold;
  margin: 0;
  padding: 0;`,
  }, {
    selector: 'h2',
    declaration: 'font-size: 1.5rem;',
  }, {
    selector: 'h3',
    declaration: 'font-size: 1.4rem;',
  }, {
    selector: 'h4',
    declaration: 'font-size: 1.3rem;',
  }, {
    selector: 'h5',
    declaration: `margin: 0;
  padding: 0;
  color: #3b464b;
  font-weight: 400;
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: 0.1em;
  line-height: 1.5 !important;`,
  }, {
    selector: 'ul li',
    declaration: 'margin: 0.4em 0;',
  }, {
    selector: 'a',
    declaration: `border-bottom: 1px solid #1A8917;
  text-decoration: none;
  color: #1A8917;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);`,
  }, {
    selector: 'a:hover',
    declaration: `color: #5FC25D;
  border-bottom: 1px solid #5FC25D`,
  }, {
    selector: 'code',
    declaration: `font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  color: #d63384;
  font-size: 0.875rem;
  word-wrap: break-word;`,
  }, {
    selector: 'table',
    declaration: `border-color: grey;
  border-spacing: 2px;
  max-width: 100%;
  width: 100%;
  border-collapse: collapse;
  margin: 2em 0;`,
  }, {
    selector: 'table th, table td',
    declaration: `padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;`,
  }];
}

export const defaultText = `# Marius Hoffman

##### Mathematics PhD Student
  
##### University of Berkeley, California
  
##### He / Him
  
-----
  
* [About Me](#about-me)
* [Education](#education)
* [Research](#research)
* [Projects](#projects)
  
----
  
## About Me 
  
I have been a PhD student in mathematics at [Berkeley](https://math.berkeley.edu/) since August 2021. My advisor is [Prof. Hopkins](https://math.berkeley.edu/) and my main research interest is [tropical geometry](https://en.wikipedia.org/wiki/Tropical_geometry). Previously, I did my undergraduate at [Emory University](https://www.math.emory.edu/home/) (2017-2021). 

You can email me at [marius.hoffman@fake.berkeley.edu](mailto:marius.hoffman@fake.berkeley.edu).

## Education

|   Major           | University        | Year          |
|-----------        | -------------     | ------------- |
| MSc Mathematics   | UC Berkeley       | since 2021    | 
| BSc Mathematics   | Emory University  | 2017-2021     |

## Research
    
* [Some Invertibility Results for Parabolic Categories](https://thatsmathematics.com/mathgen/paper.php?nameType%5B1%5D=custom&customName%5B1%5D=Marius+Hoffman&nameType%5B2%5D=generic&nameType%5B3%5D=custom&customName%5B3%5D=&nameType%5B4%5D=custom&customName%5B4%5D=&seed=1315851073&format=pdf), 2021. With P. Wilson.
* [Uniqueness Methods In Representation Theory](https://thatsmathematics.com/mathgen/paper.php?nameType%5B1%5D=custom&customName%5B1%5D=Marius+Hoffman&nameType%5B2%5D=generic&nameType%5B3%5D=custom&customName%5B3%5D=&nameType%5B4%5D=custom&customName%5B4%5D=&seed=1697466307&format=pdf), 2020. With C. T. Li.  
* [Integrability In Applied Representation Theory](https://thatsmathematics.com/mathgen/paper.php?nameType%5B1%5D=custom&customName%5B1%5D=Marius+Hoffman&nameType%5B2%5D=generic&nameType%5B3%5D=custom&customName%5B3%5D=&nameType%5B4%5D=custom&customName%5B4%5D=&seed=497305197&format=pdf), 2020. With G. White.  
  
## Essays

- [Spectral theorem of synthetic operators (pdf)](https://www.google.de)
- [Newton's maxtrix decomposition $SV_{\\lambda}$](https://www.google.de)
- [Lindelöf-Locatelli Theorem (pdf)](https://www.google.de)
`;

function generateHTML(content: string): string {
  const html = `<!DOCTYPE html>
<html>
<head>
  <!-- Change title here -->
  <title>My Resume</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="stylesheet.css">
</head>
<body>
<div class="wrapper">
${content}
</div>
</body>
</html>`;
  return html;
}

function generateCSS(): string {
  const css = `html {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  font-size: 1.1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  
img {
  width: 100%;
}

${injectCSSFile(cssConfig(), '.wrapper', `margin-top: 1rem;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  color: #333d41;`, `
@media (min-width: 576px) {
  .wrapper {
    width: 500px;
  }
}

@media (min-width: 768px) {
  .wrapper {
    width: 640px;
  }
}`)}`;
  return css;
}

const theme: Theme = {
  name: 'modern',
  defaultText,
  css: cssConfig,
  generateHTML,
  generateCSS,
};

export default theme;
