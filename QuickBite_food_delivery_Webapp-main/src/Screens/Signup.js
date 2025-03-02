import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", Geolocation: "" });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/api/creatuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.Geolocation
      })
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      alert("Signup Successful! Redirecting to login...");
      navigate("/login"); // Redirect to login page after successful signup
    } else {
      alert("Enter valid Credentials");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Name">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className='form-label'>Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} required />
            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className='form-label'>Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="Address" className='form-label'>Address</label>
            <input type="text" className="form-control" name='Geolocation' value={credentials.Geolocation} onChange={onChange} required />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className='m-3 btn btn-danger'>Already a User?</Link>
        </form>
      </div>
    </>
  );
}
