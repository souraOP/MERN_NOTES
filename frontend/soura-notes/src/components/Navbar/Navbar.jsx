import {React, useState} from 'react'
import ProfileInfo from "../Cards/ProfileInfo"
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({userInfo}) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearchNotes = () => {

  };

  const onClearSearchNotes = () => {
    setSearch("");
  };

  return (
    <div className="flex items-center justify-between bg-white drop-shadow-lg px-6 py-4 ">
      <h2 className='text-3xl font-bold text-black py-2 '>Soura Notes</h2>

      <SearchBar 
        value={search}
        onChange={({target}) => {
            setSearch(target.value);
        }}
        handleSearchNotes={handleSearchNotes}
        onClearSearchNotes={onClearSearchNotes}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar;
