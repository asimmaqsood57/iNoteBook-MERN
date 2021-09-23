import React, { useContext, useState } from "react";

import noteContext from "../context/notes/NoteContext";

const AddNote = () => {
  const context = useContext(noteContext);

  const { addNote } = context;

  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();

    console.log("hello");
    addNote(note.title, note.description, note.tag);

    setnote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>Add a Note</h2>

      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={onChange}
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={note.description}
            onChange={onChange}
            className="form-control"
            id="description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input
            type="text"
            name="tag"
            value={note.tag}
            onChange={onChange}
            className="form-control"
            id="tag"
          />
        </div>

        <button type="submit" onClick={handleClick} className="btn btn-primary">
          ADD NOTE
        </button>
      </form>
    </div>
  );
};

export default AddNote;
