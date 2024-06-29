import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md';

export default function TagInput({yourTags, setYourTags}) {

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if(inputValue.trim() !== "") {
      setYourTags([...yourTags, inputValue.trim()]);
      setInputValue("");
    }
  };
  
  // for pressing enter
  const handleKeyDown = (e) => {
    if(e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveYourTags = (deleteTag) => {
    setYourTags(yourTags.filter((tag) => tag !== deleteTag));
  };

  return (
    <div>
      {yourTags?.length > 0 && (
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {yourTags.map((tag, index) => (
            <span key={index} className="flex items-center gap-2 bg-white text-sm text-slate-900 px-3 py-1 rounded">
              # {tag}
              <button 
                onClick={() => {
                  handleRemoveYourTags(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input 
          type="text"
          className="text-lg rounded-lg p-2 outline-none bg-transparent border border-slate-100/40"
          placeholder='add ur tags'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button 
          className='w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-black'
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className='text-2xl text-orange-400 hover:text-white'/>
        </button>
      </div>
    </div>
  );
}
