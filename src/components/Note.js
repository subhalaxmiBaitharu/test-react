import React, { useState } from 'react';
import '../index.css';
import Arrow from '../images/arrow.png';
import BackArrow from '../images/backArrow.png';
import ArrowActive from '../images/arrowActive.png';

const Note = ({ notes, addNote, groupName, colour, onBack }) => {
  const [note, setNote] = useState('');

  const getFirstLetter = (string) => {
    const words = string.split(' ');
    if (words.length > 2) {
      const first = words[0].charAt(0).toUpperCase();
      const last = words[words.length - 1].charAt(0).toUpperCase();
      return first + last;
    } else {
      return words.map(ele => ele.charAt(0).toUpperCase()).join('');
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      AddNote();
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    
    const hour = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minute = String(date.getMinutes()).padStart(2, '0'); // Ensure two digits
    const pmam = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${day} ${month} ${year} • ${hour}:${minute} ${pmam}`;
  };

  const AddNote = () => {
    if (note.trim()) {
      addNote(note);
      setNote('');
    }
  };

  return (
    <div className="noteDiv">
      <div className='topBarContent'>
        <button onClick={onBack} className="backButton"><img src={BackArrow} alt='Back'/></button> {/* Back button */}
        <div className='circleName' style={{ background: colour }}>
          {getFirstLetter(groupName)}
        </div>
        <p>{groupName}</p>
      </div>
      <div className="noteList">
        {notes?.map((note, index) => (
          <div key={index} className="note" style={{ boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)' }}>
            {note.text} 
            <p className='time'>{formatTime(note.date)}</p>
          </div>
        ))}
      </div>
      <div className='lowerNoteDiv'>
        <div className="inputArea">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder=" "
            onKeyPress={handleEnterPress}
          />
          <label className={note ? 'active' : ''}>Enter your text here...</label>
          <button className="btn" onClick={AddNote}><img src={note ? ArrowActive : Arrow} alt="Arrow" /></button>
        </div>
      </div>
    </div>
  );
};

export default Note;
