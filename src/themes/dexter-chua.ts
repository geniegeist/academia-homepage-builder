import { Theme } from './theme';
import './dexter-chua.css';

const theme: Theme = {
  name: 'dexter',
  css: 'dexter-chua',
  defaultText: `# Marius Hoffmann

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
   `,
  generateHTML: (content: string) => {
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
  },
  generateCSS: () => {
    const css = `html {
  display: flex;
  justify-content: center;
}

img {
  width: 100%;
}

.wrapper {
  margin-top: 1em;
  width: 600px;
  font-family: 'Lora', serif;
  padding: calc(1em + 1ex);
}

.wrapper h1 {
  font-size: 2.2em;
  font-weight: 500;
}

.wrapper h2 {
  font-family: 'Marcellus SC', serif;
  color: #a81010;
  font-size: 1.4em;
  font-weight: 500;
}

.wrapper p {
  font-size: 1em;
}
    `;
    return css;
  },
};

export default theme;
