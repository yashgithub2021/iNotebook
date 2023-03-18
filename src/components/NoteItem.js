import React, { useEffect, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'


const NoteItem = (props) => {

    const context = useContext(NoteContext);
    const { getNotes } = context;
    const { deleteNote } = context
    const { note, updateNote } = props;

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <div className="col-md-3">
            <div className="card my-1" >
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="title">
                            <h5 className="card-title">{note.title}</h5>
                        </div>
                        <div className="action">
                            <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }}></i>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                        </div>
                    </div>
                    <hr />
                    <p className="card-text"><strong>Description:</strong>  {note.description}</p>
                    <hr />
                    <p><strong>Tag: </strong>{note.tag}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem