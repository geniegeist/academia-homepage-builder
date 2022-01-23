import { Theme } from './theme';

const theme: Theme = {
  css: 'dexter-chua',
  defaultText: `# Viet Duc Nguyen

![](https://images.unsplash.com/photo-1502101872923-d48509bff386?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80)
  
## About Me
  
I have been a PhD student at [Harvard](www.google.de) since September 2018. Previously, I did my undergraduate and Part III at [Cambridge](www.cambridge.co.uk) (2014–2018).
  
## Contact Me
  
You can email me at [dexter@math.harvard.edu](mailto:dexter@math.harvard.edu). My office is at 531.
  
## Adams Spectral Sequence for $tmf$
  
I have documented the calculation of the Adams spectral sequence of $tmf$ at the prime $2$ here (warning: this downloads a 12MB file behind the scenes).
  
This calculation was made with computer assistance. There is an online version of the software, and the source can be found on GitHub. See the README on GitHub for technical details.
  
The software computes the $E_2$ page and products, and propagates differentials via the Leibniz rule. The program is capable of resolving an arbitrary (finite dimensional or finitely generated) Steenrod module and assisting the computation of the associated Adams spectral sequence. It is also designed with the intention to be able to aid other spectral sequence calculations (as long as the modules are over $\\mathbb F_p$), but no such applications have been coded at the moment. It was initially developed by Hood Chatham and I later joined the development.
  
The save file for the calculation can be found here, which can be imported into the resolver to reproduce the calculation. (However, doing it on the online version above is unwise).
  
## Expository Writings
  
Some miscellaneous expository writings. The word "expository" refers to the lack of originality, as opposed to any claim of comprehensibility or correctness.
  
Clicking the title below will lead to a web version of the note, which is an experimental feature — let me know if anything seems broken. Click "pdf" for a downloadable pdf version.
  
- [Construction of synthetic spectra (pdf)](www.google.de)
- [Adams spectral sequence of $tmf \\land \\mathbb R\\mathbb P^{\\infty}$](www.google.de)
- [Borwein–Borwein integrals and sums (pdf)](www.google.de)
  
## Privacy Statement
  
I have a [Privacy Statement](www.google.de) as required by law (maybe).
  `,
  generateHTML: (content: string) => {
    const html = `<html>
<head>
  <title>TITLE</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="./stylesheet.css">
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
