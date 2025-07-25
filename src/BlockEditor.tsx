import { useState, useRef } from 'react';

type Block = {
    id: string;
    content: string;
    type: 'paragraph' | 'prompt' | 'response';
}

export const BlockEditor = () => {
    const [ blocksArray, setBlocksArray ] = useState<string[]>([""]);
    const nextInputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key == "Enter") {
            const newArray: string[] = [...blocksArray, ""];
            setBlocksArray(newArray);
            nextInputRef.current?.focus();
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setBlocksArray(prev => 
            prev.map((block, i) => index == i ? e.target.value : block)
        );
    }

    return (
        <div>
            {
                blocksArray.map((element, index) => (
                    <input key={index} value={element} onChange={(e) => handleOnChange(e, index)} onKeyDown={handleKeyDown} ></input>
                ))
            }

        </div>
    )
};

