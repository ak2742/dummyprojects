import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function Note(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  const onDelete = (e) => {
    let confirmDel = window.confirm(`Delete note: ${e.title}`);
    if (confirmDel) {
      deleteNote(e._id);
    }
  };

  let myStyle = {
    color: props.mode === "dark" ? "#ffffff" : "#000000",
    backgroundColor: props.mode === "dark" ? "#161928" : "#ffffff",
  };

  return (
    <div
      className="card col-md-3 mx-3 my-3"
      style={{
        color: props.mode === "dark" ? "#ffffff" : "#000000",
        backgroundColor: props.mode === "dark" ? "#161928" : "#ffffff",
        width: "18rem",
      }}
    >
      <div className="card-body" style={myStyle}>
        <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <i role="button"
            className="fas fa-edit mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
          <i role="button"
            className="fas fa-trash mx-2"
            onClick={() => {
              onDelete(note);
            }}
          ></i>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
  );
}

export default Note;
