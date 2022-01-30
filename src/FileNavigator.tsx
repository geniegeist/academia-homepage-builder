import React, { useState } from 'react';
import styled from 'styled-components';
import type { FileRef } from './hooks/useDir';
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '24px', opacity: 0.64 }}>
            <path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20C20,21.1 19.1,22 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M11,15V12H9V15H6V17H9V20H11V17H14V15H11Z" />
          </svg>
        </IconButton>
        {/*
        <IconButton
          type="button"
          onClick={() => onCreateFolder('Folder')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '25px', opacity: 0.64 }}>
            <path d="M10,4L12,6H20C21.1,6 22,6.9 22,8V18C22,19.1 21.1,20 20,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10M15,9V12H12V14H15V17H17V14H20V12H17V9H15Z" />
          </svg>
        </IconButton>
        */}
        <IconButton
          type="button"
          onClick={onDeleteFile}
        >
          <img alt="Delete file" src={TRASH_ICON} width="16px" style={{ opacity: 0.64 }} />
        </IconButton>
        <IconButton
          type="button"
          onClick={renameFile}
        >
          <img alt="Rename file" src={PEN_ICON} width="22px" style={{ opacity: 0.64 }} />
        </IconButton>
        <IconButton
          type="button"
          onClick={onClose}
        >
          <img alt="Hide menu" src={CLOSE_ICON} width="18px" style={{ opacity: 0.64 }} />
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
  font-size: 0.9em;
`;

const El = styled.li<{ selected: boolean }>`
  padding: 0.1em 1em;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#bababa' : 'clear')};
  color: rgba(0,0,0,0.7);
  &:hover {
    background-color: rgba(0,0,0,0.25);
  }
`;

const IconButton = styled.button`
  width: 44px;
  height: 44px;
  margin: 0.1em;
  background-color: transparent;
  border: none;
  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
  border-radius: 4px;
`;

export default FileNavigator;
