import React from 'react';

const getFirstLetter = (string) => {
  const words = string.split(' '); 
  const first = words[0]?.charAt(0).toUpperCase() || '';
  const last = words[1]?.charAt(0).toUpperCase() || ''; 
  return first + last;
};

const GroupList = ({ group, selectedGroup, setSelectedGroup, addGroup }) => {
  return (
    <div className="sideBar">
      <h1>Pocket Notes</h1>
      <ul>
        {Object.keys(group)?.map((ele) => (
          <div 
            key={ele}
            className={ele === selectedGroup ? 'active' : 'sideBarContent'}
            onClick={() => setSelectedGroup(ele)}
          >
            <div className='circleName' style={{ background: group[ele].colour }}>
              {getFirstLetter(ele)}
            </div>
            <li>{ele}</li>
          </div>
        ))}
      </ul>
      <button className="addButton" onClick={addGroup}>+</button>
    </div>
  );
};

export default GroupList;
