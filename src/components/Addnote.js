import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

function Addnote(props) {
    const context = useContext(NoteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const onSubmit = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    let myStyle = {
        color: props.mode === 'dark' ? '#ffffff' : '#000000',
        backgroundColor: props.mode === 'dark' ? '#161928' : '#ffffff',
    }

    return (
        <form onSubmit={onSubmit} style={myStyle}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" placeholder="minimum 3 chars" id="title" name="title" onChange={onChange} value={note.title} minLength={3} required />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" placeholder="minimum 5 chars" id="description" name="description" onChange={onChange} value={note.description} minLength={5} rows="3" required></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag (optional)</label>
                <input type="text" className="form-control" placeholder="separated by comma(,)" id="tag" name="tag" onChange={onChange} value={note.tag} />
            </div>
            <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary">Add Note</button>
        </form>
    )
}

export default Addnote
