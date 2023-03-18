import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


const SignUp = () => {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "" })
    const navigate = useNavigate();

    //SignUp
    const signUp = async (e) => {
        e.preventDefault();

        const resp = await fetch('http://localhost:4000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await resp.json();
        console.log(json)
        if (json.checkuser) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email already Exist!',
            })
        }

        if (json.success) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Congratulations',
                footer: 'Registered Successfully',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/login')
        }
        else {
        }
    }

    //onchange
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className="container mx-5 my-5 p-5">
            <h1 className='text-center'>
                Register
            </h1>
            <form className=" my-5" onSubmit={signUp}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Username</label>
                    <input onChange={onChange} value={credentials.username} name="name" type="text" className="form-control" id="name" minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={onChange} value={credentials.email} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={onChange} value={credentials.password} name="password" type="password" className="form-control" id="exampleInputPassword1" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp