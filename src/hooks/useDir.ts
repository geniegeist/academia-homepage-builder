import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import MarkdownFile from '../models/MarkdownFile';
import useLocalStorage from './useLocalStorage';
import { defaultText as amandaText } from '../themes/amanda-burcroff';
import { defaultText as dexterText } from '../themes/dexter-chua';

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
const WELCOME_TEXT = `# Welcome to ResumeEdit!

---

Hi! I’m a Markdown file and I will help you to create your **resume homepage** in *under two minutes*. If you want to learn more about it, you can read me and edit me. Once you have finished with me, you can download your homepage as a HTML file and upload it to a server of your choice.

## What is Markdown?

Markdown is a *easy-to-learn* language for creating plain documents. Here we use Markdown to create homepages.

To add headlines use the hashtag \`# Title\` followed by a title. Add more hashtags to change the hierarchy, e.g. \`## Not so important title\`.

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5

To emphasize text use the asterisk: *italic*, **bold**, ***bold and italic***.

As you can see you create lists with \`-\` or \`1. 2. 3.\`, e.g.

1. first item
2. second item
3. third item

- item
- item
- item

Here comes a link and an image

[Click me](https://www.wikipedia.org)

![alternative text](https://images.unsplash.com/photo-1517485883175-4ae93081b334?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80)


## Themes

Now you know everything to create your own homepage. We recommend you to explore our awesome themes!


## Advanced  

You can write LaTex $x + y = \\frac{x+y}{7 - 6}$

$$
  \\int^b_a F_x(\\varphi^\\lambda) \\mathrm{d}x
$$
`;

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

  const amandaId = uuid();
  const amanda: MarkdownFile = {
    id: amandaId,
    name: 'Amanda Example',
    theme: 'amanda',
    content: amandaText,
    type: 'markdown',
  };
  const amandaRef: FileRef = {
    id: amanda.id, meta: { name: amanda.name }, type: 'file',
  };

  const dexterId = uuid();
  const dexter: MarkdownFile = {
    id: dexterId,
    name: 'Dexter Example',
    theme: 'dexter',
    content: dexterText,
    type: 'markdown',
  };
  const dexterRef: FileRef = {
    id: dexter.id, meta: { name: dexter.name }, type: 'file',
  };

  const initialDir: Directory = {
    files: [ref, amandaRef, dexterRef],
    lastOpenedFile: ref,
  };

  window.localStorage.setItem(id, JSON.stringify(file));
  window.localStorage.setItem(amandaId, JSON.stringify(amanda));
  window.localStorage.setItem(dexterId, JSON.stringify(dexter));

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

  const saveFile = useCallback((fileId: string, content: string) => {
    const item = window.localStorage.getItem(fileId);
    if (!item) {
      return;
    }
    const referenceFile = JSON.parse(item) as MarkdownFile;

    const file: MarkdownFile = {
      ...referenceFile!,
      content,
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

  return {
    directory, setLastOpenedFile, saveFile, createFile, createFolder,
  } as const;
}

export default useDir;
