import { Theme } from './theme';
import './default.css';

const theme: Theme = {
  name: 'default',
  css: 'default',
  defaultText: `# Welcome 

---

Hi! I’m a Markdown file and I will help you to create your **personal homepage** in *under two minutes*. If you want to learn more about it, you can read me and edit me. Once you have finished with me, you can download your homepage as a HTML file and upload it to a server of your choice.

## What is Markdown?

Markdown is a *easy-to-learn* language for creating plain documents. Here we use Markdown to create homepages.

To add headlines use the hashtag \`# Title\` followed by a title. Add more hashtags to change the hierarchy, e.g. \`## Not so important title\`.

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5

To emphasize text use the asterisk: *italic*, **bold**, ***bold and italic***.

As you can see you create lists with \`-\` or \`1. 2. 3.\`, e.g.

1. first item
2. second item
3. third item

- item
- item
- item

Here comes a link and an image

[Click me](https://www.wikipedia.org)

![alternative text](https://images.unsplash.com/photo-1517485883175-4ae93081b334?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80)


## Themes

Now you know everything to create your own homepage. We recommend you to explore our awesome themes!


## Advanced  

You can write LaTex $x + y = \\frac{x+y}{7 - 6}$

$$
  \\int^b_a F_x(\\varphi^\\lambda) \\mathrm{d}x
$$
`,
  generateHTML: (content: string) => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>TITLE</title>
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
