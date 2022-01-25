import React from 'react';
import styled from 'styled-components';
import type { FileRef } from './hooks/useDir';
import NEW_FILE_ICON from './assets/icons/new-file.svg';

interface Props {
  files: FileRef[];
  selectedFile?: string;
}

function FileNavigator({ files, selectedFile }: Props) {
  return (
    <Wrapper>
      <TopNavbar>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: '24px', opacity: 0.64 }}>
          <path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20C20,21.1 19.1,22 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M11,15V12H9V15H6V17H9V20H11V17H14V15H11Z" />
        </svg>
      </TopNavbar>
      <List>
        {files.map((fileRef) => {
          const selected = fileRef.id === selectedFile;
          console.log(selected);
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
`;

export default FileNavigator;
