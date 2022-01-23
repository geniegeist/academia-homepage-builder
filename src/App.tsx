import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { unified } from 'unified';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeMathjax from 'rehype-mathjax';
import remarkParse from 'remark-parse/lib';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify/lib';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import CodeMirrorEditor from './CodeMirror';
import type { Theme } from './themes/theme';
import amandaTheme from './themes/amanda-burcroff';
import dexterTheme from './themes/dexter-chua';
import './App.css';
import './themes/dexter-chua.css';
import './themes/amanda-burcroff.css';

function App() {
  const [theme, setTheme] = useState<Theme>(dexterTheme);
  const [editorValue, setEditorValue] = useState(theme.defaultText);

  const onCodeMirrorChange = useCallback((value) => {
    setEditorValue(value);
  }, [setEditorValue]);

  return (
    <div className="App">
      <div style={{ backgroundColor: '#212121' }}>
        <span style={{ color: '#cccccc' }}>Theme: </span>
        <button type="button" onClick={() => setTheme(dexterTheme)}>
          Dexter
        </button>
        <button type="button" onClick={() => setTheme(amandaTheme)}>
          Amanda
        </button>

        <button
          style={{ right: 0, position: 'fixed' }}
          type="button"
          onClick={() => {
            const file = unified()
              .use(remarkParse)
              .use(remarkGfm)
              .use(remarkMath)
              .use(remarkRehype)
              .use(rehypeMathjax)
              .use(rehypeSlug)
              .use(rehypeStringify)
              .process(editorValue)
              .then(({ value }) => {
                const zip = new JSZip();
                zip.file('index.html', theme.generateHTML(value as string));
                zip.file('stylesheet.css', theme.generateCSS());
                zip.generateAsync({ type: 'blob' }).then((blob) => {
                  FileSaver.saveAs(blob, 'homepage.zip');
                });
              });
          }}
        >
          Build website
        </button>
      </div>
      <Editor>
        <form>
          <CodeMirrorEditor
            value={theme.defaultText}
            onChange={onCodeMirrorChange}
          />
        </form>
      </Editor>

      <Result className={`result ${theme.css}`}>
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeMathjax, rehypeSlug]}
        >
          {editorValue}
        </ReactMarkdown>
        <div style={{ height: '3em' }} />
      </Result>
    </div>
  );
}

const Editor = styled.div`
  position: fixed;
  left: 0;
  width: 50%;
  overflow: auto;
`;

const Result = styled.div`
  position: fixed;
  right: 0;
  left: 50%;
  overflow: auto;
  background-color: white;
  height: 100%;
  margin-bottom: 3em;
`;

export default App;
