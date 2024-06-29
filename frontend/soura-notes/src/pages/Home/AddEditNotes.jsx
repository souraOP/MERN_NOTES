import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput';
import { GiCrossedBones } from "react-icons/gi";
import axiosInstance from '../../utils/axios-instance';

export default function AddEditNotes({onClose, noteContent, getTheNote, type, showToastMessage}) {
  const [title, setTitle] = useState(noteContent?.title || "");
  const [content, setContent] = useState(noteContent?.content || "");
  const [yourTags, setYourTags] = useState(noteContent?.yourTags || []);
  const [error, setError] = useState(null);

      // adding a new note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title, content, yourTags, 
      });
      if(response.data && response.data.note){
        showToastMessage("Note added successfully");
        getTheNote();
        onClose();
      }
    } catch (error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
    }
  };

  // editing a note
  const editNotes = async () => {
    const noteId = noteContent._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId , {
        title, content, yourTags, 
      });
      if(response.data && response.data.note){
        showToastMessage("Note edited successfully");
        getTheNote();
        onClose();
      }
    } catch (error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = async () => {
    if(!title) {
      setError("Title kon add karge bhai ?");
      return;
    }
    if(!content) {
      setError("Content nhi add kiya ?");
      return;
    }
    setError("");
    if(type === "edit") {
      // handle edit
      await editNotes();
    } else {
      await addNewNote();
      getTheNotes();
      onClose();
    }
  };

  return (
    <div className="text-white relative">

      {/* gotta add that close button man */}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full absolute -top-3 -right-2 hover:bg-slate-800"
        onClick={onClose}
      >
        <GiCrossedBones className="text-xl"/>
      </button>
      <div className="flex flex-col gap-2">
        <label className='input-label text-lg'>Title</label>
        <input 
            type='text'
            className='text-2xl text-slate-900 outline-none rounded-lg p-2'
            placeholder='ur title will be here'
            value={title}
            onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label text-lg'>
            Content
        </label>
        <textarea 
            type="text"
            className="text-slate-900 outline-none bg-slate-100 p-3 rounded-lg text-base"
            placeholder="anything on your mind?"
            rows={8}
            value={content}
            onChange={({target}) => setContent(target.value)}
        />
      </div>
      <div className='mt-5'>
        <label className='input-label'>TAGS</label>
        <TagInput yourTags={yourTags} setYourTags={setYourTags} />
      </div>

      {error && <p className="text-red-500 pt-4 text-base">{error}</p>}
      <button className='btn-primary font-medium mt-5 p-3' onClick={handleAddNote}>{type === 'edit' ? 'UPDATE' : 'ADD'}</button>
    </div>
  );
}
