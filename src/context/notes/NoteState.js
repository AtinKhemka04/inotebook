import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const notesInitial = [
    {
      user: "633133bb2576fc03951858d6",
      title: "My title",
      description: "Do work regularly",
      tag: "personal",
      _id: "633e4e96ca6ee95c7882240b",
      date: "2022-10-06T03:42:14.366Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
