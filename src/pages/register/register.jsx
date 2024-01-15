import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Change to useNavigate
import ExampleContext from '../../context/Context';
import '../login/login.css'; // Create this file for styling
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate(); // Use useNavigate instead of Navigate
    const { userid, setUserid, isLogin, setLogin, setUsername } = useContext(ExampleContext);

    useEffect(() => {
        if (isLogin) {
            navigate('/');
        }
    }, [isLogin, navigate]);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        profileImage: null, // New state for storing the selected image
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        // Check if the input is a file input for the image
        if (type === 'file') {
            const file = e.target.files[0];
            setFormData({ ...formData, profileImage: file });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('username', formData.username);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('profileImage', formData.profileImage);

            const res = await axios.post('/register', formDataToSend);
            setUserid(res.data.id);
            setUsername(res.data.username);
            setLogin(true);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="p-8 bg-white rounded shadow-md auth-container w-96">
                <h1 className="mb-4 text-2xl font-bold">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Username:</span>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="block w-full mt-1 text-black form-input"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Email:</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full mt-1 text-black form-input"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Password:</span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full mt-1 text-black form-input"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Profile Image:</span>
                        <input
                            type="file"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleChange}
                            className="block w-full mt-1 text-black form-input"
                        />
                    </label>
                    <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
