import { CSSConfig, Theme } from './theme';

function cssConfig(): CSSConfig[] {
  return [{
    declaration: `color: rgba(41, 41, 41, 1);
  padding: 1em;`,
  }, {
    selector: 'h1, h2, h3, h4, h5, h6',
    declaration: `font-weight: bold;
  line-height: 2;`,
  }, {
    selector: 'h1',
    declaration: 'line-height: 1.5 !important;',
  }, {
    selector: 'ul li',
    declaration: 'margin: 0.4em 0;',
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

export const defaultText = `# Welcome to ResumeEdit!

---

Hi! I’m a Markdown file and I will help you to create your **resume homepage** in *under two minutes*. If you want to learn more about it, you can read me and edit me. Once you have finished with me, you can download your homepage as a \`HTML\` file and upload it to a server of your choice.

## What is Markdown?

Markdown is an *easy-to-learn* language for creating documents. Here we use Markdown to create \`HTML\` files.

To add headlines use the hashtag \`#\` symbol. Add more hashtags to change the hierarchy, e.g. \`##\`:

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5

To emphasize text use the asterisk symbol \`*\`: 

*italic*, **bold**, ***bold and italic***.

You can even use \`LaTex\` to render math formulas, e.g. $x^2$ or

$$
  \\int^b_a F_x(\\varphi^\\lambda) \\mathrm{d}x
$$

You can create list by starting a new line with \`-\` or \`1. 2. 3.\`, e.g.

1. first item
2. second item
3. third item

- item
- item
- item

To insert links and images see the following two examples

[Click me](https://www.wikipedia.org)

![alternative text](https://images.unsplash.com/photo-1517485883175-4ae93081b334?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80)

Inserting tables is also a very easy task

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

You can even change the alignment of the columns

| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| git status   | git status     | git status    |
| git diff     | git diff       | git diff      |


## Themes

Now you know everything to create your own homepage. We recommend exploring our awesome themes. Open the left menu by clicking on the folder icon in the top left corner. Then open one of the example files!

**A preview of our themes**

![Classic Theme](https://i.imgur.com/5iXaVMU.png)

![Modern Theme](https://i.imgur.com/QlMr59l.png)

## Publishing Your Resume

Build your website by clicking on the button in the top right corner. Open the \`zip\` file and inspect the \`HTML\` and \`CSS\` file. Upload both files to a webserver. You can use the webserver of your department (e.g. if you are a Berkeley student, look [here](https://iris.eecs.berkeley.edu/faq/web/homepages/)) or use [github pages](https://pages.github.com/).

`;

const theme: Theme = {
  name: 'default',
  defaultText,
  css: cssConfig,
  generateHTML: (content: string) => {
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
</html>
  `;

    return html;
  },
  generateCSS: () => {
    const css = `html {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  font-size: 1.1rem;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  width: 100%;
}

.wrapper {
  margin-top: 1rem;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

@media (min-width: 576px) {
  .wrapper {
    width: 500px;
  }
}

@media (min-width: 768px) {
  .wrapper {
    width: 640px;
  }
}`;
    return css;
  },
};

export default theme;
