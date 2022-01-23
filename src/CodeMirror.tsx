import React, { useCallback, useEffect, useRef } from 'react';
import CodeMirror, { EditorView, ViewUpdate, useCodeMirror } from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

interface Props {
  value: string;
  onChange?: (value: string) => void;
}

function CodeMirrorEditor({ value, onChange = undefined }: Props) {
  const editor = useRef<HTMLDivElement>(null);

  const codeMirrorOnChange = useCallback((newValue: string, viewUpdate: ViewUpdate) => {
    if (onChange) {
      onChange(newValue);
    }
  }, [onChange]);

  const { setContainer, setView } = useCodeMirror({
    value,
    container: editor.current,
    width: '100%',
    minWidth: '100%',
    height: 'calc(100vh - 64px)',
    minHeight: '100%',
    theme: oneDark,
    onChange: codeMirrorOnChange,
    extensions: [
      markdown({
        base: markdownLanguage,
      }),
    ],
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);

  return (<div ref={editor} />);
}

export default CodeMirrorEditor;
