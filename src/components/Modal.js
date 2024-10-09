import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

const Modal = ({ saveGroup, onClose }) => {
  const colours = ["#B38BFA", "#FF66F0", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];
  const [groupName, setGroupName] = useState('');
  const [colour, setColour] = useState(colours[0]); 

  const saveGroupData = () => {
    if (groupName.trim()) {
      saveGroup(groupName, colour);
      setGroupName('');
      setColour(colours[0]);
    }
  };
  const manageClickOutside = (event) => {
    const modal = document.getElementById('modalContent');
    if (modal && !modal.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', manageClickOutside);
    return () => {
      document.removeEventListener('mousedown', manageClickOutside);
    };
  }, []);

  return (
    <div className="modal">
      <div className="modalContent" id="modalContent">
        <div className='modalTitle'>
          <h2>Create New Group</h2>
        </div>
        <div className='modalField'>
          <h3>Group Name</h3>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
          />
        </div>
        <div className='selectColour'>
          <h3>Choose Colour</h3>
          {colours.map((ele) => (
            <Box
              key={ele}
              onClick={() => setColour(ele)}
              className={ele === colour ? 'activeColour' : ''}
              sx={{ background: `${ele}`, borderRadius: "50%", cursor: "pointer", height: { xs: "1.5rem", md: "2.5rem" }, width: { xs: "1.5rem", md: "2.5rem" }, marginLeft: "0.5rem" }}
            />
          ))}
        </div>
        <button className='modalButton' onClick={saveGroupData}>Create</button>
      </div>
    </div>
  );
};

export default Modal;
