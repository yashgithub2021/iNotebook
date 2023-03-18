import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";
import Swal from "sweetalert2";


const NoteState = (props) => {

    //Database url
    const url = "http://localhost:4000"


    // All Notes
    const allNotes = []
    const [notes, setnotes] = useState(allNotes)


    // Get Notes
    const getNotes = async () => {
        const resp = await fetch(`${url}/api/notes/fetchNotes`, {
            method: 'GET',
            headers: {
                "auth-token": localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
        const json = await resp.json();
        setnotes(json)
    }


    //Add Note
    const addNote = async (title, description, tag) => {
        const resp = await fetch(`${url}/api/notes/addNote`, {
            method: 'POST',
            headers: {
                "auth-token": localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, tag })
        });
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your note has been saved',
            showConfirmButton: false,
            timer: 1500
        })
        const json = await resp.json();
        setnotes(notes.concat(json))
    }


    //Edit Note
    const editNote = async (id, title, description, tag) => {
        //Confirmation to Update
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update it!'
        }).then(async (result) => {
            //If Confirmed
            if (result.isConfirmed) {
                const resp = await fetch(`${url}/api/notes/updateNote/${id}  `, {
                    method: 'PUT',
                    headers: {
                        "auth-token": localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title, description, tag })
                });
                const json = await resp.json();

                let newNotes = JSON.parse(JSON.stringify(notes))
                for (let index = 0; index < newNotes.length; index++) {
                    const element = newNotes[index];
                    if (element._id === id) {
                        element.title = title;
                        element.description = description;
                        element.tag = tag;
                        break;
                    }
                }
                setnotes(newNotes)
                Swal.fire(
                    'Updated!',
                    'Your note has been Updated.',
                    'success'
                )
            }
        })


    }


    //Delete note
    const deleteNote = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resp = await fetch(`${url}/api/notes/deleteNote/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "auth-token": localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                });
                const newNotes = notes.filter((note) => { return note._id !== id })
                setnotes(newNotes)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
    return (
        <NoteContext.Provider value={{ notes, getNotes, deleteNote, addNote, editNote }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;