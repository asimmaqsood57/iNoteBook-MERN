import React, { useContext } from "react";

import NoteItem from "./NoteItem";

import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);

  const { notes, addNote } = context;

  return (
    <>
      <AddNote />
      <div className="container">
        <div className="row my-3">
          <h2>Your Notes</h2>

          {notes.map((Note) => {
            return <NoteItem key={Note._id} note={Note} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
