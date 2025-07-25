import { useState, useRef, useEffect } from 'react';

type Block = {
  id: string;
  content: string;
  type: 'paragraph' | 'prompt' | 'response';
};

export const BlockEditor = () => {
  const [blocksArray, setBlocksArray] = useState<string[]>(['']);
  const refs = useRef<{ [key: string]: HTMLInputElement }>({});
  const [focusId, setFocusId] = useState<string | null>(null);

  useEffect(() => {}, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key == 'Enter') {
      const newArray: string[] = [...blocksArray, ''];
      setBlocksArray(newArray);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setBlocksArray((prev) => prev.map((block, i) => (index == i ? e.target.value : block)));
  };

  return (
    <div>
      {blocksArray.map((element, index) => (
        <input
          key={index}
          value={element}
          onChange={(e) => handleOnChange(e, index)}
          onKeyDown={handleKeyDown}
        ></input>
      ))}
    </div>
  );
};
