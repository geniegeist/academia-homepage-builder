import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
import { CodeMirrorEditor } from './codemirror';
import type { Theme } from './themes/theme';
import defaultTheme from './themes/default';
import amandaTheme from './themes/amanda-burcroff';
import dexterTheme from './themes/dexter-chua';
import './App.css';
import './one-dark.css';

function App() {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [editorValue, setEditorValue] = useState(theme.defaultText);

  const onCodeMirrorChange = useCallback(({ target }) => {
    const { value }: { value: string } = target;
    setEditorValue(value);
  }, [setEditorValue]);

  const onThemeChange = useCallback((evt) => {
    const { value } = evt.target;
    if (value === 'amanda') {
      setTheme(amandaTheme);
    } else if (value === 'dexter') {
      setTheme(dexterTheme);
    } else if (value === 'default') {
      setTheme(defaultTheme);
    }
  }, [setTheme]);

  const buildWebsite = useCallback(() => {
    unified()
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
  }, [theme, editorValue]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" className="px-3" style={{ height: '64px' }}>
        <Navbar.Brand>Academia Homepage Builder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://github.com/geniegeist/academia-homepage-builder/wiki/Help" target="_blank">Examples</Nav.Link>
            <Nav.Link href="https://github.com/geniegeist/academia-homepage-builder/wiki/Help" target="_blank">Help</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Form className="mx-3">
          <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Label style={{ color: 'white', paddingRight: '0.8em', margin: 0 }}>Theme: </Form.Label>
            <Form.Select value={theme.name} onChange={onThemeChange} style={{ maxWidth: '200px' }}>
              <option value="amanda">Amanda</option>
              <option value="dexter">Dexter</option>
              <option value="default">Default</option>
            </Form.Select>
          </Form.Group>
        </Form>

        <Button variant="primary" onClick={buildWebsite}>
          Build website
        </Button>
      </Navbar>

      <div className="editor">
        <form>
          <CodeMirrorEditor
            mode="markdown"
            theme="one-dark"
            value={editorValue}
            onChange={onCodeMirrorChange}
            lineWrapping
            lineNumbers
          />
        </form>
      </div>

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

function fromNow(milliSeconds: number): Date {
  const date = new Date();
  date.setMilliseconds(date.getMilliseconds() + milliSeconds);
  return date;
}

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
