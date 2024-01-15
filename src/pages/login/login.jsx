// src/Login.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Change to useNavigate
import ExampleContext from '../../context/Context';
import axios from 'axios';
import './login.css'; // Reuse the styling file

const Login = () => {
    const navigate = useNavigate(); // Use useNavigate instead of Navigate
    const { userid, setUserid, isLogin, setLogin, setUsername } = useContext(ExampleContext);

    useEffect(() => {
        console.log('...', isLogin)
        if (isLogin) {
            navigate('/home');
        }
    }, [isLogin, navigate]); // Include navigate in the dependency array
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/login', formData);
            console.log(res.data)
            setUserid(res.data.id)
            setUsername(res.data.username)
            setLogin(true)
            console.log(userid)
        } catch (error) {
            // Handle the error, e.g., show an error message to the user
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="auth-container bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Email:</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Password:</span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full"
                        />
                    </label>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Login
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Login;
