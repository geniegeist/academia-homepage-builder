import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import MarkdownFile from '../models/MarkdownFile';
import useLocalStorage from './useLocalStorage';
import { defaultText as modernText } from '../themes/modern';
import { defaultText as classicText } from '../themes/classic';
import { defaultText } from '../themes/default';

interface Directory {
  files: FileRef[];
  lastOpenedFile?: FileRef;
}

export interface FileRef {
  id: string;
  meta: {
    name: string;
  };
  type: 'file' | 'folder';
}

export interface Folder {
  files: FileRef[];
  type: 'folder';
}

const DIR_KEY = 'DIRECTORY';
const WELCOME_TEXT = defaultText;

if (!window.localStorage.getItem(DIR_KEY)) {
  window.localStorage.setItem(DIR_KEY, JSON.stringify(initDirectory()));
}

function initDirectory(): Directory {
  const id = uuid();
  const name = 'Welcome';
  const ref: FileRef = {
    id,
    meta: {
      name,
    },
    type: 'file',
  };

  const file: MarkdownFile = {
    id,
    name,
    theme: 'default',
    content: WELCOME_TEXT,
    type: 'markdown',
  };

  const modernId = uuid();
  const modern: MarkdownFile = {
    id: modernId,
    name: 'Modern Example',
    theme: 'modern',
    content: modernText,
    type: 'markdown',
  };
  const modernRef: FileRef = {
    id: modern.id, meta: { name: modern.name }, type: 'file',
  };

  const classicId = uuid();
  const classic: MarkdownFile = {
    id: classicId,
    name: 'Classic Example',
    theme: 'classic',
    content: classicText,
    type: 'markdown',
  };
  const classicRef: FileRef = {
    id: classic.id, meta: { name: classic.name }, type: 'file',
  };

  const initialDir: Directory = {
    files: [ref, modernRef, classicRef],
    lastOpenedFile: ref,
  };

  window.localStorage.setItem(id, JSON.stringify(file));
  window.localStorage.setItem(modernId, JSON.stringify(modern));
  window.localStorage.setItem(classicId, JSON.stringify(classic));

  return initialDir;
}

export function loadFile(fileId: string): MarkdownFile | undefined {
  const item = window.localStorage.getItem(fileId);
  if (!item) {
    return undefined;
  }
  const file = JSON.parse(item) as (MarkdownFile | undefined);
  if (file) {
    return file;
  }

  return undefined;
}

function useDir() {
  const [directory, setDirectory] = useLocalStorage<Directory>(DIR_KEY);

  const saveFile = useCallback((fileId: string, content: string, theme: string) => {
    const item = window.localStorage.getItem(fileId);
    if (!item) {
      return;
    }
    const referenceFile = JSON.parse(item) as MarkdownFile;

    const file: MarkdownFile = {
      ...referenceFile!,
      content,
      theme,
    };

    window.localStorage.setItem(fileId, JSON.stringify(file));
  }, [window]);

  const createFile = useCallback((name: string) => {
    const id = uuid();
    const file: MarkdownFile = {
      id, name, content: '# Hello World', theme: 'default', type: 'markdown',
    };
    window.localStorage.setItem(id, JSON.stringify(file));

    const fileRef: FileRef = {
      id,
      meta: { name },
      type: 'file',
    };
    setDirectory({
      files: [...directory.files, fileRef],
      lastOpenedFile: fileRef,
    });
  }, [uuid, window, setDirectory, directory]);

  const createFolder = useCallback((name: string) => {
    const id = uuid();
    const folder: Folder = {
      files: [],
      type: 'folder',
    };

    setDirectory({
      files: [...directory.files, {
        id,
        meta: {
          name,
        },
        type: 'folder',
      }],
      lastOpenedFile: directory.lastOpenedFile,
    });

    window.localStorage.setItem(id, JSON.stringify(folder));
  }, [uuid, setDirectory, window, directory]);

  const setLastOpenedFile = useCallback((fileId: string) => {
    const fileRef = directory.files.find((s) => s.id === fileId);
    if (!fileRef) {
      return;
    }

    setDirectory({
      files: directory.files,
      lastOpenedFile: fileRef,
    });
  }, [directory, setDirectory]);

  const deleteFile = useCallback((fileId: string) => {
    window.localStorage.removeItem(fileId);

    let { lastOpenedFile } = directory;
    if (directory.lastOpenedFile?.id === fileId) {
      lastOpenedFile = undefined;
    }
    setDirectory({
      files: directory.files.filter((f) => f.id !== fileId),
      lastOpenedFile,
    });
  }, [directory, setDirectory]);

  const renameFile = (fileId: string, newName: string) => {
    const item = window.localStorage.getItem(fileId);
    if (!item) {
      console.log('Cannot find file with id:', fileId);
      return;
    }
    const file = JSON.parse(item) as MarkdownFile;
    if (!file) {
      console.log('Cannot parse item with content:', item);
      return;
    }
    file.name = newName;
    window.localStorage.setItem(fileId, JSON.stringify(file));
    // update dir
    const newDir = directory;
    const newFilesDir = newDir.files.map((f) => {
      if (f.id !== fileId) {
        return f;
      }
      const newF = f;
      newF.meta.name = newName;
      return newF;
    });
    newDir.files = newFilesDir;
    setDirectory(newDir);
  };

  return {
    directory, setLastOpenedFile, saveFile, createFile, deleteFile, renameFile, createFolder,
  } as const;
}

export default useDir;
