import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
function About() {
  const a = useContext(noteContext);

  return (
    <div>
      <h1>This is About.js {a.name}</h1>
    </div>
  );
}

export default About;
