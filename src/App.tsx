import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
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

  const onThemeChange = useCallback((evt) => {
    const { value } = evt.target;
    if (value === 'amanda') {
      setTheme(amandaTheme);
    } else if (value === 'dexter') {
      setTheme(dexterTheme);
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
  }, []);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" className="px-3" style={{ height: '64px' }}>
        <Navbar.Brand>Academia Homepage Builder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://github.com/geniegeist/academia-homepage-builder/wiki/Help" target="_blank">Help</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Form className="mx-3">
          <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
            <Form.Label style={{ color: 'white', paddingRight: '0.8em', margin: 0 }}>Theme: </Form.Label>
            <Form.Select onChange={onThemeChange} style={{ maxWidth: '200px' }}>
              <option value="amanda">Amanda</option>
              <option selected value="dexter">Dexter</option>
            </Form.Select>
          </Form.Group>
        </Form>

        <Button variant="primary" onClick={buildWebsite}>
          Build website
        </Button>
      </Navbar>
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
