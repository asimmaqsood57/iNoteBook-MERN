import React, { useContext, useEffect, useRef, useState } from "react";

import NoteItem from "./NoteItem";

import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import { useHistory } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const history = useHistory();
  const { notes, addNote, getNotes, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      history.push("/login");
    }

    //eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });

    props.showAlert("updated Successfully", "success");
  };

  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();

    console.log("hello");

    editNote(note.id, note.etitle, note.edescription, note.etag);

    refClose.current.click();
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        style={{ display: "none" }}
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    className="form-control"
                    id="edescription"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    className="form-control"
                    id="etag"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                ref={refClose}
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                class="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddNote />
      <div className="container">
        <div className="row my-3">
          <h2>Your Notes</h2>

          <div className="container">
            {notes.length === 0 && "No Notes to display"}
          </div>

          {notes.map((Note) => {
            return (
              <NoteItem
                key={Note._id}
                note={Note}
                updateNote={() => updateNote(Note)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
