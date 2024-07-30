import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import footer from '../images/fotter.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.data.user.auth_token);
      navigate('/movies');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="p-0 bg-dark signin position w-100 h-100 d-flex justify-content-center align-items-center flex-column">
        <div className='d-flex justify-content-center flex-column align-items-center gap-4'>
            <form onSubmit={handleLogin}>
                <h1 className='text-white text-center'>Sign In</h1>
                <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <input
                type="password"
                className='mt-3'
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <div className="d-flex gap-2 check-box align-items-center text-white mt-3">
                    <input type="checkbox" />
                    <div>Remember me</div>
                    </div>
                <button type="submit" className='mt-3'>Login</button>
            </form>
        </div>
        <div className="d-flex align-items-end fotter w-100">
            <img src={footer} alt="" className="w-100" />
      </div>
    </div>
  );
};

export default Login;
