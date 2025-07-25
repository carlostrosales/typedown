import { useState, useRef, useEffect } from 'react';

type Block = {
  id: string;
  content: string;
  type: 'paragraph' | 'prompt' | 'response';
};

export const BlockEditor = () => {
  const [blocksArray, setBlocksArray] = useState<string[]>(['']);
  const refs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const [focusIndex, setFocusIndex] = useState<number>(0);

  useEffect(() => {
    setFocusIndex(blocksArray.length - 1);
    if (focusIndex != undefined) {
      refs.current[focusIndex]?.focus();
    }
  }, [focusIndex, blocksArray]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      const newArray: string[] = [...blocksArray, ''];
      setBlocksArray(newArray);
    } else if (e.key == 'Delete' || e.key == 'Backspace') {
      if (blocksArray[focusIndex] == '' && focusIndex != 0) {
        const newArray = blocksArray.filter((_, i) => i != focusIndex);
        setBlocksArray(newArray);
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setBlocksArray((prev) => prev.map((block, i) => (index == i ? e.target.value : block)));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%' }}>
      {blocksArray.map((element, index) => (
        <input
          key={index}
          value={element}
          onChange={(e) => handleOnChange(e, index)}
          onKeyDown={handleKeyDown}
          ref={(el) => {
            refs.current[index] = el;
          }}
          style={{ border: 'none', outline: 'none' }}
        ></input>
      ))}
    </div>
  );
};
