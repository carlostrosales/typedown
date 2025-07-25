import { useState } from 'react';

type Block = {
    id: string;
    content: string;
    type: 'paragraph' | 'prompt' | 'response';
}

export const BlockEditor = () => {
    const [ value, setValue ] = useState("");
    const [ blocksArray, setBlocksArray ] = useState<string[]>([value]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key == "Enter") {
            const newArray: string[] = [...blocksArray, value];
            setBlocksArray(newArray);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div>
            {
                blocksArray.map((element, index) => (
                    <input key={index} value={value} onChange={handleChange} onKeyDown={handleKeyDown} ></input>
                ))
            }

        </div>
    )
};

