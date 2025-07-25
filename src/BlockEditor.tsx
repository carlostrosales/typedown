import { useState, useRef, useEffect } from 'react';

type Block = {
  id: string;
  content: string;
  type: 'paragraph' | 'prompt' | 'response';
};

export const BlockEditor = () => {
  const [blocksArray, setBlocksArray] = useState<string[]>(['']);
  const refs = useRef<{ [key: number]: HTMLInputElement | null }>({});
  const [focusIndex, setFocusIndex] = useState<number>();

  useEffect(() => {
    setFocusIndex(blocksArray.length - 1);
    if (focusIndex != undefined) {
      refs.current[focusIndex]?.focus();
    }
  }, [focusIndex, blocksArray]);

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
          ref={(el) => {
            refs.current[index] = el;
          }}
        ></input>
      ))}
    </div>
  );
};
