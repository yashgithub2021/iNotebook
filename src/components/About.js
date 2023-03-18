import React from 'react'
import logo from '../images/yash2.jpg'
import { Link } from 'react-router-dom'

export const About = () => {

    return (
        <>
            <div className="card mb-3 img-card my-3">
                <img height={400} src={logo} className="card-img-top" alt="IMG" />
                <div className="card-body">
                    <h2 className="card-title text-center">Name: Yash Barge</h2>
                    {/* <p className="card-text ">Full Stack Developer</p> */}
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Current student in MIT WPU for Bachelor of
                        Computer Application Program(BCA). Well-rounded experience in Web Development with
                        dreams of becoming a Full Stack Developer.
                    </li>
                </ul>
                <div className="card-body d-flex justify-content-evenly">
                    <Link to="https://www.linkedin.com/in/yash-barge-a2b536209/"><i className="fa-brands fa-linkedin fa-2xl"></i></Link>
                    <Link to="mailto:yashbarge007@gmail.com?subject=Mail"><i className="fa-solid fa-envelope fa-2xl"></i></Link>
                    <Link to="tel:9403188321"><i className="fa-solid fa-phone fa-2xl"></i></Link>
                </div>
            </div>
        </>
    )
}
