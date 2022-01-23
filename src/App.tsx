import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeMathjax from 'rehype-mathjax';
import CodeMirrorEditor from './CodeMirror';
import type { Theme } from './themes/theme';
import amandaTheme from './themes/amanda-burcroff';
import dexterTheme from './themes/dexter-chua';
import './App.css';
import './themes/dexter-chua.css';
import './themes/amanda-burcroff.css';

function App() {
  const [theme, setTheme] = useState<Theme>(amandaTheme);
  const [editorValue, setEditorValue] = useState(theme.defaultText);

  const onCodeMirrorChange = useCallback((value) => {
    setEditorValue(value);
  }, [setEditorValue]);

  return (
    <div className="App">
      <div>
        Theme:
        <button type="button" onClick={() => setTheme(dexterTheme)}>
          Dexter
        </button>
        <button type="button" onClick={() => setTheme(amandaTheme)}>
          Amanda
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
