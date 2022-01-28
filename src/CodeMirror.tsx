import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    CodeMirror: any;
  }
}

const { CodeMirror } = window;

// Adapted from:
// https://github.com/facebook/react/blob/master/docs/_js/live_editor.js#L16

// also used as an example:
// https://github.com/facebook/react/blob/master/src/browser/ui/dom/components/ReactDOMInput.js

interface Props {
  value: string;
  onChange: (arg: { target: { value: string } }) => void;
  config: any;
}

function CodeMirrorEditor({ value, onChange, config }: Props) {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const editor = useRef<any>();
  const handleChange = () => {
    const editorValue = editor.current.getValue();

    if (onChange) {
      onChange({ target: { value: editorValue } });
    }
  };

  useEffect(() => {
    editor.current = CodeMirror.fromTextArea(editorRef.current, config);
    editor.current.on('change', handleChange);
  }, []);

  return (
    <textarea
      ref={editorRef}
      onChange={onChange}
      value={value}
    />
  );
}

export default CodeMirrorEditor;
