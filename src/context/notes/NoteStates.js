import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteStates = (props) => {
  const host = `http://${process.env.REACT_APP_SERVER}`;
  let authToken = localStorage.getItem("auth");
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/allnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: authToken,
        },
      });
      const existingNotes = await response.json();
      setNotes(existingNotes);
      return 0
    } catch (error) {
      console.log("could not connect to server")
      return -1
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authToken: authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const addedNote = await response.json();
      setNotes(notes.concat(addedNote));
      return 0
    } catch (error) {
      console.log("could not connect to server")
      return -1
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authToken: authToken
        }
      });
      await response.json();
      const afterDeleted = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(afterDeleted);
      return 0
    } catch (error) {
      console.log("could not connect to server")
      return -1
    }
  };

  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/editnote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authToken: authToken
        },
        body: JSON.stringify({ title, description, tag })
      });
      await response.json();
      const newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        let element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      return 0
    } catch (error) {
      console.log("could not connect to server")
      return -1
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteStates;
