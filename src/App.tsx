import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeMathjax from 'rehype-mathjax';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import CodeMirrorEditor from './CodeMirror';
import FileNavigator from './FileNavigator';
import useDir from './hooks/useDir';
import useWebsiteBuilder from './hooks/useWebsiteBuilder';
import useTheme from './hooks/useTheme';
import useActiveFile from './hooks/useActiveFile';
import { CSSConfig, injectCSS } from './themes/theme';
import './App.css';
import './one-dark.css';
import FOLDER_ICON from './assets/icons/folder.svg';
import SAVE_ICON from './assets/icons/save-file.svg';

const NAVBAR_HEIGHT = '50px';

function App() {
  const {
    directory, saveFile, createFile, createFolder, setLastOpenedFile,
  } = useDir();
  const [activeFileId, setActiveFileId, getActiveFile] = useActiveFile(directory.lastOpenedFile?.id);
  const [theme, setTheme] = useTheme(getActiveFile()?.theme);
  const [editorValue, setEditorValue] = useState(getActiveFile()?.content ?? '# Hello World');
  const justOpenedFile = useRef(false);
  // observe when active file changes
  // load content and set theme of the
  // new active file
  useEffect(() => {
    const activeFile = getActiveFile();
    if (activeFile) {
      setEditorValue(activeFile.content);
      setTheme(activeFile.theme);
    }
  }, [getActiveFile, setTheme, setEditorValue]);

  const [fileChanged, setFileChanged] = useState(false);
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [build] = useWebsiteBuilder();

  // Callbacks

  const onCodeMirrorChange = ({ target }: any) => {
    const { value }: { value: string } = target;
    setEditorValue(value);
    if (justOpenedFile.current) {
      // this case happens when user opens another file
      // the editor will report this change
      // but we will ignore this
      justOpenedFile.current = false;
    } else {
      setFileChanged(true);
    }
  };

  const onThemeChange = (evt: any) => {
    const { value }: { value: string } = evt.target;
    setTheme(value);
  };

  const buildWebsite = () => {
    const activeFile = getActiveFile();
    if (!activeFile) {
      return;
    }
    saveFile(activeFile.id, editorValue);
    build(editorValue, (html) => {
      const zip = new JSZip();
      zip.file('index.html', theme.generateHTML(html));
      zip.file('stylesheet.css', theme.generateCSS());
      zip.file('sourcecode.md', editorValue);
      zip.generateAsync({ type: 'blob' }).then((blob) => {
        FileSaver.saveAs(blob, 'homepage.zip');
      });
    });
  };

  const saveFileCallback = (evt: any) => {
    const activeFile = getActiveFile();
    if (activeFile) {
      saveFile(activeFile.id, editorValue);
      setFileChanged(false);
    }
  };

  const onFileClick = (fileId: string) => {
    if (activeFileId) {
      saveFile(activeFileId, editorValue);
      setFileChanged(false);
    }
    justOpenedFile.current = true;
    setLastOpenedFile(fileId);
    setActiveFileId(fileId);
  };

  return (
    <Row className="App gx-0">
      {showLeftMenu && (
        <Col xs={12} sm={3} md={2} style={{ height: '100vh' }}>
          <FileNavigator
            files={directory.files}
            selectedFile={getActiveFile()?.id}
            onFileClick={onFileClick}
            onCreateFile={(name) => createFile(name)}
            onCreateFolder={(name) => createFolder(name)}
          />
        </Col>
      )}
      <Col sm={showLeftMenu ? 9 : 12} md={showLeftMenu ? 10 : 12}>
        <Navbar bg="dark" variant="dark" className="px-1" style={{ height: NAVBAR_HEIGHT }}>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => setShowLeftMenu(!showLeftMenu)}><img className="icon-folder" alt="folder icon" width="24px" src={FOLDER_ICON} /></Nav.Link>
              <Nav.Link onClick={saveFileCallback}>
                <img className="icon-save" alt="folder icon" width="22px" src={SAVE_ICON} />
                {fileChanged && <span className="px-2">Unsaved changes</span>}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Form className="mx-3">
            <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
              <Form.Label style={{ color: 'white', paddingRight: '0.8em', margin: 0 }}>Theme: </Form.Label>
              <Form.Select value={theme.name} onChange={onThemeChange} style={{ maxWidth: '200px' }} size="sm">
                <option value="amanda">Amanda</option>
                <option value="dexter">Dexter</option>
                <option value="default">Default</option>
              </Form.Select>
            </Form.Group>
          </Form>

          <Button variant="primary" onClick={buildWebsite} size="sm" className="mx-2">
            Build website
          </Button>
        </Navbar>
        <Container fluid>
          <Row className="gx-0 overflow-scroll">
            <Col sm className="overflow-scroll" style={{ height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
              <form style={{ height: '100%' }}>
                <CodeMirrorEditor
                  value={editorValue}
                  onChange={onCodeMirrorChange}
                  config={{
                    mode: 'markdown',
                    theme: 'one-dark',
                    lineWrapping: true,
                    lineNumbers: true,
                  }}
                />
              </form>
            </Col>
            <Result sm className="overflow-scroll d-flex justify-content-center" $cssConfig={theme.css()}>
              <ReactMarkdownWrapper>
                <ReactMarkdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeMathjax, rehypeSlug]}
                >
                  {editorValue}
                </ReactMarkdown>
                <div style={{ height: '2em' }} />
              </ReactMarkdownWrapper>
            </Result>
          </Row>
        </Container>
      </Col>
    </Row>
  );
}

const Result = styled(Col) <{ $cssConfig: CSSConfig[] }>`
  height: calc(100vh - 64px);
  img {
    width: 100%;
  }
  ${(props) => injectCSS(props.$cssConfig)}
`;

const ReactMarkdownWrapper = styled.div`
  padding: calc(1em + 1ex);
  max-width: 640px;
`;

export default App;
