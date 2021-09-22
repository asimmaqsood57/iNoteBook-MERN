import NoteContext from "./NoteContext";

import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:3001";

  const notesinitialState = [];

  const [notes, setNotes] = useState(notesinitialState);

  // get all notes

  const getNotes = async () => {
    //ToDo api call

    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0NTllMGMwM2Q4Y2RkMTA3ZGJhMTg3In0sImlhdCI6MTYzMTk3Mzg5Mn0.jmgZjX42WrdaCmZxR9ZcOkWoJRxPCQLKlnqN5DljVl0",
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects

    console.log(json);
    setNotes(json);
  };

  // Add a note

  const addNote = async (title, description, tag) => {
    //ToDo api call

    const data = {
      title,
      description,
      tag,
    };

    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0NTllMGMwM2Q4Y2RkMTA3ZGJhMTg3In0sImlhdCI6MTYzMTk3Mzg5Mn0.jmgZjX42WrdaCmZxR9ZcOkWoJRxPCQLKlnqN5DljVl0",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    // const json = response.json(); // parses JSON response into native JavaScript objects

    let note = {
      _id: "6146c2cbff2e680c28",
      user: "61459e0c03d8cdd107dba187",
      title: title,
      description: description,
      tag: tag,
      date: "20 21-09-19T04:55:39.526Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  // Delete a note

  const deleteNote = (id) => {
    console.log("deleting the node with id", id);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(newNotes);
  };

  // Edit a note

  const editNote = async (id, title, description, tag) => {
    //Api calls

    const data = {
      id,
      title,
      description,
      tag,
    };

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0NTllMGMwM2Q4Y2RkMTA3ZGJhMTg3In0sImlhdCI6MTYzMTk3Mzg5Mn0.jmgZjX42WrdaCmZxR9ZcOkWoJRxPCQLKlnqN5DljVl0",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
