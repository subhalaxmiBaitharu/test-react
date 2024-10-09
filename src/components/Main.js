import React, { useState, useEffect } from 'react';
import GroupList from './GroupList';
import Note from './Note';
import Modal from './Modal';
import Photo from '../images/background.png';
import Lock from '../images/Vector.png';

function Main() {
  const [group, setGroup] = useState(JSON.parse(localStorage.getItem('groupName')) || {});
  const [selectedGroup, setSelectedGroup] = useState(Object.keys(group)[0] || null);
  const [modal, setModal] = useState(false);
  const [mobileView, setMobileView] = useState(window.innerWidth < 768); 

  const goBack = () => {
    setSelectedGroup(null); 
  };

  useEffect(() => {
    const Resize = () => setMobileView(window.innerWidth < 768);
    
    window.addEventListener('resize', Resize);
    return () => window.removeEventListener('resize', Resize);
  }, []);

  useEffect(() => {
    localStorage.setItem('groupName', JSON.stringify(group));
  }, [group]);

  const addGroup = (groupName, colour) => {
    if (groupName && !group[groupName]) {
      setGroup({ ...group, [groupName]: { notes: [], colour } });
      setModal(false);
    }
  };

  const createNote = (note) => {
    const date = new Date().toLocaleString();
    const newNote = { text: note, date };

    setGroup((prevGroup) => {
      const currentGroup = prevGroup[selectedGroup] || { notes: [] };
      return {
        ...prevGroup,
        [selectedGroup]: {
          ...currentGroup,
          notes: [...(currentGroup.notes || []), newNote],
        },
      };
    });
  };

  const groupClick = (groupName) => {
    setSelectedGroup(groupName);
  };

  return (
    <div className="container">
      {!mobileView || (mobileView && !selectedGroup) ? (
        <GroupList 
          group={group} 
          selectedGroup={selectedGroup} 
          setSelectedGroup={groupClick} 
          addGroup={() => setModal(true)} 
        />
      ) : null}
      
      {!selectedGroup && !mobileView && (
        <div className='center'>
          <img src={Photo} alt="Background" />
          <h1>Pocket Notes</h1>
          <p>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone.</p>
        </div>
      )}
      {selectedGroup && (
        <Note 
          notes={group[selectedGroup]?.notes || []}
          addNote={createNote} 
          groupName={selectedGroup}
          colour={group[selectedGroup].colour}
          onBack={goBack} 
        />
      )}
      {!selectedGroup && <div className='lockContainer'>
        <img src={Lock} alt="Lock" />
        <p>end-to-end encrypted</p>
      </div>}
      {modal && <Modal saveGroup={addGroup} onClose={() => setModal(false)} />}
    </div>
  );
}

export default Main;
