import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import Swal from 'sweetalert2'


const Notes = (props) => {

    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;

    const ref = useRef(null)
    const closeRef = useRef(null)
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


    const update = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)

    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    //If user is Logged In fetch its notes 
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()

        }// Else navigate to Login page
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Login first!',
            })
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title " id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" name='edescription' id="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" name='etag' id="etag" value={note.etag} onChange={onChange} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-success" onClick={update}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* All Notes */}
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                </div>
                <div className="container">
                    {notes.length === 0 && "No Notes to Display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} />
                })}

            </div>
        </>
    )
}

export default Notes