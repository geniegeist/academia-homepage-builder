import React, { useEffect, useRef } from 'react';

const CodeMirror = window.CodeMirror

// Adapted from:
// https://github.com/facebook/react/blob/master/docs/_js/live_editor.js#L16

// also used as an example:
// https://github.com/facebook/react/blob/master/src/browser/ui/dom/components/ReactDOMInput.js

const CodeMirrorEditor = ({ value, onChange, config }) => {
  const editorRef = useRef(null);
  const editor = useRef(null);
  
  const handleChange = () => {
    const value = editor.current.getValue()

    if (onChange) {
      onChange({target: {value}});
    }
  };

  useEffect(() => {
    editor.current = CodeMirror.fromTextArea(editorRef.current, config);
    editor.current.on('change', handleChange);
  }, []);

  return (
    <textarea
      ref={editorRef}
      value={value}
      onChange={onChange}
    />
  );
};

export default CodeMirrorEditor;
