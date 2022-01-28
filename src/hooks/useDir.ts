import { v4 as uuid } from 'uuid';
import MarkdownFile from '../models/MarkdownFile';
import useLocalStorage from './useLocalStorage';

interface Directory {
  files: FileRef[];
  activeFile?: FileRef;
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

Hi! I’m a Markdown file and I will help you to create your **personal homepage** in *under two minutes*. If you want to learn more about it, you can read me and edit me. Once you have finished with me, you can download your homepage as a HTML file and upload it to a server of your choice.

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

  const initialDir: Directory = {
    files: [ref],
    activeFile: ref,
  };

  window.localStorage.setItem(id, JSON.stringify(file));

  return initialDir;
}

function useDir() {
  const [directory, setDirectory] = useLocalStorage<Directory | null>(DIR_KEY, null);

  const loadFile = (fileId: string): MarkdownFile | null => {
    const [file, setFile] = useLocalStorage(fileId, null);
    if (file) {
      return file;
    }

    return null;
  };

  const saveFile = (fileId: string, content: string) => {
    if (!directory) {
      console.log('Cannot save file because no directory exists');
      return;
    }

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
  };

  const createFolder = (name: string) => {
    if (!directory) {
      console.log('Cannot create folder since directory does not exist');
      return;
    }

    const id = uuid();
    const folder: Folder = {
      files: [],
      type: 'folder',
    };

    setDirectory({
      files: [...directory!.files, {
        id,
        meta: {
          name,
        },
        type: 'folder',
      }],
      activeFile: directory!.activeFile,
    });

    window.localStorage.setItem(id, JSON.stringify(folder));
  };

  let activeFile: MarkdownFile | null = null;
  if (directory?.activeFile) {
    activeFile = loadFile(directory.activeFile.id);
  }

  return [directory, activeFile, loadFile, saveFile, createFolder] as const;
}

export default useDir;
