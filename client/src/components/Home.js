import React, { useContext } from "react";
import AddNote from "./AddNote";

import Notes from "./Notes";

import noteContext from "../context/notes/NoteContext";

const Home = () => {
  const context = useContext(noteContext);

  const { addNote } = context;

  return (
    <>
      <Notes />
    </>
  );
};

export default Home;
