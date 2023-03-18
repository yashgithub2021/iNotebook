import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


const Login = () => {

    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        const resp = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await resp.json();
        console.log(json)

        if (json.success) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Welcome',
                footer: 'Login Successful',
                showConfirmButton: false,
                timer: 1500
            })
            localStorage.setItem('token', json.jwtData)
            navigate('/')

        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wrong Credentials!',
            })
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className="container mx-5 my-5 p-5">

            <form onSubmit={login} className=" my-5 ">
                <h1 className='text-center'>
                    Login
                </h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={onChange} value={credentials.email} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={onChange} value={credentials.password} name="password" type="password" className="form-control" id="exampleInputPassword1" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>
    )
}

export default Login