import React, { useEffect, useRef } from 'react';

// Adapted from:
// https://github.com/remarkjs/react-markdown/blob/website/src/codemirror.js

declare global {
  interface Window {
    CodeMirror: any;
  }
}

interface Props {
  value: string;
  onChange: (dict: { target: { value: string } }) => void;
  config: any;
}

const { CodeMirror } = window;

function CodeMirrorEditor({ value, onChange, config }: Props) {
  const editorRef = useRef(null);
  let editor: any = null;

  function handleChange() {
    if (!editor) {
      return;
    }

    const editorValue = editor.getValue();
    if (editorValue === value) {
      return;
    }

    if (onChange) {
      onChange({ target: { value: editorValue } });
    }

    if (editor.getValue() !== value) {
      editor.setValue(value);
    }
  }

  // setup editor ref
  useEffect(() => {
    editor = CodeMirror.fromTextArea(editorRef.current, config);
    editor.on('change', handleChange);
    console.log('Component did mount', editor);
  }, []);

  useEffect(() => {
    console.log(CodeMirror);
    // console.log(CodeMirror.fromTextArea(editorRef.current, config));
    if (editor && value !== editor.getValue()) {
      editor.setValue(value);
    }
  }, [value]);

  return (
    <textarea
      ref={editorRef}
      value={value}
      onChange={onChange}
    />
  );
}

export default CodeMirrorEditor;
