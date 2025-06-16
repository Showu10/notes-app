import { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("myNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  useEffect(() => {
    localStorage.setItem("myNotes", JSON.stringify(notes));
  }, [notes]);

  function handleSubmit(e) {
    e.preventDefault();
    const newNote = e.target.elements[0].value.trim();
    if (newNote === "") {
      alert("Please enter a note");
    } else if (notes.some(n => n.toLowerCase() === newNote.toLowerCase())) {
      alert("Note already added");
    } else {
      setNotes(prevNotes => [...prevNotes, newNote]);
    }
    e.target.reset(); // Clear input
  }

  function deleteMe(indexToDelete) {
    setNotes(prevNotes => prevNotes.filter((_, index) => index !== indexToDelete));
  }

  return (
    <div className="mainbody">
      <h1>Notes App</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <textarea type="text" className="input" placeholder="Add a note"></textarea>
          <input type="submit" className="submit" />
        </form>
      </div>
      <div className="notes">
        <ul className="notes-list">
          {notes.map((note, index) => (
            <div className="note" key={index}>
              <h1>Note {index + 1}</h1>
              <li>{note}</li>
              <button onClick={() => deleteMe(index)}>Delete</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
