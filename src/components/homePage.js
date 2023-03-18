import React, { useEffect } from 'react'
import Notes from './Notes'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {

    const navigate = useNavigate();
    //If user is Logged In fetch its notes 
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please Login first!',
            })
            navigate('/login')
        }// Else do nothing
        else {
            // eslint-disable-next-line
        }
    }, [])

    return (

        <div >
            <Notes />
        </div>
    )
}
