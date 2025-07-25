import { useState, useRef, useEffect } from 'react';

type Block = {
  id: string;
  content: string;
  type: 'paragraph' | 'prompt' | 'response';
};

export const BlockEditor = () => {
  const [blocksArray, setBlocksArray] = useState<Block[]>([
    { id: crypto.randomUUID(), content: '', type: 'paragraph' },
  ]);
  const refs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [focusId, setFocusId] = useState<string | null>(null);

  useEffect(() => {
    if (focusId != undefined) {
      refs.current[focusId]?.focus();
    }
  }, [focusId, blocksArray]);

  const handleKeyDown = (index: string) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      const newBlock: Block = {
        id: crypto.randomUUID(),
        content: '',
        type: 'paragraph',
      };
      const newArrayWithNewBlock: Block[] = [...blocksArray, newBlock];
      setBlocksArray(newArrayWithNewBlock);
      setFocusId(newBlock.id);
    } else if (e.key == 'Delete' || e.key == 'Backspace') {
      const idx = blocksArray.findIndex((b) => b.id === index);
      if (blocksArray[idx].content == '' && idx != 0) {
        const newArray = blocksArray.filter((_, i) => i != idx);
        setBlocksArray(newArray);
        setFocusId(blocksArray[idx - 1].id);
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: string) => {
    setBlocksArray((prev) =>
      prev.map((block) => (index == block.id ? { ...block, content: e.target.value } : block)),
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%' }}>
      {blocksArray.map((block) => (
        <input
          placeholder="Start typing..."
          key={block.id}
          value={block.content}
          onChange={(e) => handleOnChange(e, block.id)}
          onKeyDown={handleKeyDown(block.id)}
          onFocus={() => setFocusId(block.id)}
          ref={(el) => {
            refs.current[block.id] = el;
          }}
          style={{ border: 'none', outline: 'none' }}
        ></input>
      ))}
    </div>
  );
};
