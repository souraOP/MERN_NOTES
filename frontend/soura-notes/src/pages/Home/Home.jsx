import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NotesPage from '../../components/Cards/NotesPage'
import { IoMdAdd } from 'react-icons/io'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axios-instance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import addNoteImg from '../../assets/images/add-note.svg'

export default function Home() {

  const [openAddNotesModal, setOpenAddNotesModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [showToastMessage, setShowToastMessage] = useState({
    isShown: false,
    message: "",
    type: "add",
  });
  const [userInfo, setUserInfo] = useState(null);
  const [theNote, setTheNote] = useState([]);
  const navigate = useNavigate();


  // getting our user information for the navbar to show the name of the user using only the initials of the user created
  // from home -> navbar -> profile_info -> userInfo.fullName

  // clearing out the local storage and redirecting to login page if the user is not authenticated
  const getTheUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");

      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if(error.response.status === 401){
        localStorage.clear(); // clearing out all the local storage
        navigate("/login");  // redirecting to login page
      }
    }
  };

  // getting all the notes from the authenticated user
  const getTheNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-note");
      if(response.data && response.data.notes){
        setTheNote(response.data.notes);
      }
    } catch (error){
      console.log("Error getting the notes", error);
    }
  };

  // deleting a note
  const deleteNote = async (data) => {
    try {
      const response = await axiosInstance.delete("/delete-note/" + data._id);
      if(response.data && !response.data.error){
        showToastMessage("Note Deleted successfully", 'delete');
        getTheNotes();
      }
    } catch (error){
      if(error.response && error.response.data && error.response.data.message){
        console.log("Unexpected error has occured!");
      }
    }
  };

  const handleCloseToastMessage = () => {
    setShowToastMessage({ isShown: false, message: "" });
  };

  const showToastMsgs = (message, type) => {
    setShowToastMessage({ isShown: true, message, type});
  };


  const handleEdit = (noteContent) => {
    setOpenAddNotesModal({ isShown: true, type: "edit", data: noteContent });
  };

  useEffect(() => {
    getTheNotes();
    getTheUserInfo(); 
  
    return () => {};
  }, []);
  
  return (
    <>
      <Navbar userInfo={userInfo}/>

      <div className='container mx-auto'>
        {theNote.length > 0 ? <div className='grid grid-cols-3 gap-4 mt-10'>
          {theNote.map((item, index) => (
            <NotesPage
              key={item._id}
              title = {item.title}
              date={item.createdOn}
              content= {item.content}
              tags= {item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => {}}  
            />
          ))}
          
        </div> : (
          <EmptyCard message={"Start creating your first note! Click the 'Add' button to jot down your notes!"} imgSrc={addNoteImg}/>
        )}
      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 hover:bg-emerald-700 absolute right-10 bottom-10" 
              onClick={() => {
                setOpenAddNotesModal({ isShown: true, type: "add", data: null });
              }}>
        <IoMdAdd className='text-white text-[36px]'/>
      </button>

      <Modal
        isOpen={openAddNotesModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.65)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-black rounded-lg p-5 mt-16 mx-auto shadow-lg overflow-hidden border border-gray-400"
      >
        <AddEditNotes 
          type={openAddNotesModal.type}
          noteContent={openAddNotesModal.data}
          onClose={() => {
            setOpenAddNotesModal({ isShown: false, type: "add", data: null});
          }}
          getTheNotes={getTheNotes}
          showToastMsgs={showToastMsgs}
        />
      </Modal>
      <Toast 
        isShown={showToastMessage.isShown}
        message={showToastMessage.message}
        type={showToastMessage.type}
        onClose={handleCloseToastMessage}
      />
    </>
  );
}
