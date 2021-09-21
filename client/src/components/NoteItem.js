import React, { useContext } from "react";

import noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const { note } = props;

  const context = useContext(noteContext);

  const { deleteNote } = context;

  return (
    <div className="col-md-3 mx-3 my-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="far fa-trash-alt mx-2"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <i className="far fa-edit mx-2"></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
