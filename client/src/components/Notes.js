import React, { useContext } from "react";

import noteContext from "../context/notes/NoteContext";

const Notes = () => {
  const context = useContext(noteContext);

  const { notes, setNotes } = context;

  return (
    <div>
      <h2>Your Notes</h2>

      {notes.map((Note) => {
        return Note.title;
      })}
    </div>
  );
};

export default Notes;
