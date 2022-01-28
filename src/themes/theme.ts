export type Theme = {
  name: string;
  defaultText: string;
  css: () => CSSConfig[];
  generateHTML: (content: string) => string;
  generateCSS: (config?: any) => string;
};

export type CSSConfig = {
  selector?: string;
  declaration: string;
};

export function injectCSS(cssConfig: CSSConfig[]):string {
  if (!cssConfig) {
    return '';
  }
  let root = '';
  cssConfig.forEach((css) => {
    if (css.selector) {
      root = `${root}
      ${css.selector} {
        ${css.declaration}
      }`;
    } else {
      root = `${root}
      ${css.declaration}`;
    }
  });
  return root;
}

export function
injectCSSFile(cssConfig: CSSConfig[], rootCSSClass: string, rootCSSDeclaration: string, cssRaw: string):string {
  if (!cssConfig) {
    return '';
  }
  let root = '';
  cssConfig.forEach((css) => {
    if (css.selector) {
      root = `${root}
      ${css.selector} {
        ${css.declaration}
      }`;
    } else {
      root = `${root}
      ${rootCSSClass} {
        ${css.declaration}
        ${rootCSSDeclaration}
      }`;
    }
  });

  if (cssRaw) {
    root = `${root}
    ${cssRaw}
    `;
  }
  return root;
}
