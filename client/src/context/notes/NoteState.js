import NoteContext from "./NoteContext";

import { useState } from "react";

const NoteState = (props) => {
  const notesinitialState = [
    {
      _id: "6146c22fcd2819033a564d4f",
      user: "61459e0c03d8cdd107dba187",
      title: "Mytitle",
      description: "this is my first note",
      tag: "hello",
      date: "2021-09-19T04:53:03.580Z",
      __v: 0,
    },
    {
      _id: "6146c2c8ff2e682943ba0c24",
      user: "61459e0c03d8cdd107dba187",
      title: "Mytitle dgekf",
      description: "this is my first send note",
      tag: "hello dfff",
      date: "2021-09-19T04:55:36.473Z",
      __v: 0,
    },
    {
      _id: "6146c2caff2e682943ba0c26",
      user: "61459e0c03d8cdd107dba187",
      title: "Mytitle dgekf",
      description: "this is my first send note",
      tag: "hello dfff",
      date: "2021-09-19T04:55:38.716Z",
      __v: 0,
    },
    {
      _id: "6146c2cbff2e682943ba0c28",
      user: "61459e0c03d8cdd107dba187",
      title: "Mytitle dgekf",
      description: "this is my first send note",
      tag: "hello dfff",
      date: "2021-09-19T04:55:39.526Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesinitialState);

  // Add a note

  const addNote = (title, description, tag) => {
    //ToDo api call
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

  const editNote = (id, title, description, tag) => {
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
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
