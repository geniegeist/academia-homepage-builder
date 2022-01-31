import React, { useState } from 'react';
import styled from 'styled-components';
import type { FileRef } from './hooks/useDir';
import FILE_PLUS_ICON from './assets/icons/file-plus.svg';
import TRASH_ICON from './assets/icons/trash.svg';
import PEN_ICON from './assets/icons/pen.svg';
import CLOSE_ICON from './assets/icons/close.svg';

interface Props {
  files: FileRef[];
  selectedFile?: string;
  onCreateFile: (name: string) => void;
  onCreateFolder: (name: string) => void;
  onFileClick: (fileId: string) => void;
  onDeleteFile: () => void;
  onRenameFile: (newName: string) => void;
  onClose: () => void;
}

function FileNavigator({
  files, selectedFile, onCreateFolder, onCreateFile, onFileClick, onDeleteFile, onRenameFile, onClose,
}: Props) {
  const [inEdit, setInEdit] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const renameFile = () => {
    if (selectedFile) {
      setInEdit(true);
    }
  };
  const onInputFileNameFocus = (evt: any) => {
    if (!selectedFile) {
      return;
    }
    const selectedFileName = files.find((f) => f.id === selectedFile)?.meta.name ?? '';
    setFileName(selectedFileName);
  };
  const onInputFileNameChange = (evt: any) => {
    setFileName(evt.target.value);
  };
  const onInputFileKeyDown = (evt: any) => {
    if (evt.key === 'Enter') {
      evt.currentTarget.blur();
    }
  };
  const onSubmitRename = (newName: string) => {
    setInEdit(false);
    onRenameFile(newName);
  };

  return (
    <Wrapper>
      <TopNavbar>
        <IconButton
          type="button"
          onClick={() => onCreateFile('New File')}
        >
          <img alt="New file" src={FILE_PLUS_ICON} width="17px" />
        </IconButton>
        <IconButton
          type="button"
          onClick={onDeleteFile}
        >
          <img alt="Delete file" src={TRASH_ICON} width="16px" />
        </IconButton>
        <IconButton
          type="button"
          onClick={renameFile}
        >
          <img alt="Rename file" src={PEN_ICON} width="22px" />
        </IconButton>
        <IconButton
          type="button"
          onClick={onClose}
          style={{ marginLeft: 'auto' }}
        >
          <img alt="Hide menu" src={CLOSE_ICON} width="18px" />
        </IconButton>
      </TopNavbar>
      <List>
        {files.map((fileRef) => {
          const selected = fileRef.id === selectedFile;
          return (
            <El key={fileRef.id} selected={selected} onClick={() => onFileClick(fileRef.id)}>
              {(inEdit && selected) ? (
                <input
                  autoFocus
                  type="text"
                  value={fileName}
                  onFocus={onInputFileNameFocus}
                  onBlur={(evt) => onSubmitRename(evt.target.value)}
                  onChange={onInputFileNameChange}
                  onKeyDown={onInputFileKeyDown}
                />
              ) : (
                fileRef.meta.name
              )}
            </El>
          );
        })}
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #dddddd;
`;

const TopNavbar = styled.div`
  width: 100%;
  background-color: rgba(0,0,0,0.1);
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 0.2em;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  font-size: 0.9rem;
`;

const El = styled.li<{ selected: boolean }>`
  padding: 0.1em 1em;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#bababa' : 'clear')};
  color: rgba(0,0,0,0.7);
  &:hover {
    background-color: rgba(0,0,0,0.25);
  }
  input {
    font-size: 0.9rem;
    border: 0;
    border-radius: 4px;
  }
`;

const IconButton = styled.button`
  width: 38px;
  height: 38px;
  margin: 0.05em;
  background-color: transparent;
  border: none;
  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
  border-radius: 4px;
  img {
    opacity: 0.64;
  }
`;

export default FileNavigator;
