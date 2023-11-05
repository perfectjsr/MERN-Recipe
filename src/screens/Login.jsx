import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert("Enter valid credentials")
        }
        else {
            localStorage.setItem("userEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"))
            navigate("/");
        }
    }
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <div style={{ justifyContent: 'center', alignItems: 'center', height: '70vh', margin: 'auto', width: '30rem', padding: '20px' }}>
        <h1 className='text-center'>Login</h1>
            <div className='container p-4' style={{ border: '2px solid #ccc', borderRadius: '10px', }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <br /><hr />
                    <div className="row d-flex">
                        <button type="submit" className="col text-start btn btn-success justify-center ms-2 text-center">Submit</button>
                        <Link to="/createuser" className='col text-end btn btn-danger justify-center ms-2 text-center'>New User</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
