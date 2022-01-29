import { useState, useCallback } from 'react';
import { loadFile } from './useDir';

function useActiveFile(initialFileId: string | undefined) {
  const [activeFileId, setActiveFileId] = useState<string | undefined>(initialFileId);
  const getActiveFile = useCallback(() => {
    if (activeFileId) {
      return loadFile(activeFileId);
    }

    return undefined;
  }, [activeFileId]);

  return [activeFileId, setActiveFileId, getActiveFile] as const;
}

export default useActiveFile;
