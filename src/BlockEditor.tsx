import { useState } from 'react';

type Block = {
    id: string;
    content: string;
    type: 'paragraph' | 'prompt' | 'response';
}

export const BlockEditor = () => {

    const [ blocksArray, setBlocksArray ] = useState<string[]>([]);
    const [ value, setValue ] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key == "Enter") {
            console.log("Enter key was pressed.");
            const arr: string[] = [value];
            setBlocksArray(arr);
        }
    }

    return (
        <div>
            <input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} />
            {
                blocksArray.map((element, index) => (
                    <span key={index}>{element}</span>
                ))
            }
        </div>
    )
};

