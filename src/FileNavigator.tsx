import React from 'react';
import styled from 'styled-components';
import type { FileRef } from './hooks/useDir';

interface Props {
  files: FileRef[];
  selectedFile?: string;
  onCreateFolder: () => void;
}

function FileNavigator({ files, selectedFile, onCreateFolder }: Props) {
  return (
    <Wrapper>
      <TopNavbar>
        <IconButton>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '24px', opacity: 0.64 }}>
            <path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20C20,21.1 19.1,22 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M11,15V12H9V15H6V17H9V20H11V17H14V15H11Z" />
          </svg>
        </IconButton>
        <IconButton
          type="button"
          onClick={() => onCreateFolder()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '24px', opacity: 0.64 }}>
            <path d="M10,4L12,6H20C21.1,6 22,6.9 22,8V18C22,19.1 21.1,20 20,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10M15,9V12H12V14H15V17H17V14H20V12H17V9H15Z" />
          </svg>
        </IconButton>
      </TopNavbar>
      <List>
        {files.map((fileRef) => {
          const selected = fileRef.id === selectedFile;
          return (
            <El key={fileRef.id} selected={selected}>
              {fileRef.meta.name}
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
  height: 64px;
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
