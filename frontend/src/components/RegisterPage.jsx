import React from "react";
import axios from 'axios';
import AuthForm from "./AuthForm";

const API_URL = import.meta.env.VITE_API_URL;

const RegisterPage = ({navigate, setToken, setError}) => {
    const handleRegister = async({name,email,password}) => {
        try {
            console.log('Sending registration data:', {name, email, password: '***'});
            const res = await axios.post(`${API_URL}/auth/register`,{name,email,password});
            setToken(res.data.token);
            navigate('home');
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            setError(error.response?.data?.msg || 'Registration failed');
        }
    };
    return (
        <>
            <AuthForm type="register" onSubmit={handleRegister} setError={setError} />
            <p className="text-center mt-4 text-slate-600">
                Already have an account? <button onClick={() => navigate('login')} className="font-medium text-teal-600 hover:text-teal-500">Login here</button>
            </p>
        </>
    );
};

export default RegisterPage;