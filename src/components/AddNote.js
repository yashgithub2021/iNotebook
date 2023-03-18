import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {

    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const add = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="p-4 mx-3"><form>
            <h2>Add Note</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={3} required />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" name='description' id="description" value={note.description} onChange={onChange} minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" name='tag' id="tag" value={note.tag} onChange={onChange} required />
            </div>

            <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={add}>Add Note</button>
        </form>
        </div>
    )
}

export default AddNote