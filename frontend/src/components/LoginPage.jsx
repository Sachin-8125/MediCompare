import React from 'react';
import axios from 'axios';
import AuthForm from "./AuthForm";

const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = ({navigate, setToken, setError}) => {
    const handleLogin = async({email,password}) => {
        const res = await axios.post(`${API_URL}/auth/login`,{email,password});
        setToken(res.data.token);
        navigate('home');
    };
    return (
        <>
            <AuthForm type='login' onSubmit={handleLogin} setError={setError}/>
            <p className="text-center mt-4 text-slate-600">
                Don't have an account? <button onClick={() => navigate('register')} className="font-medium text-teal-600 hover:text-teal-500">Register here</button>
            </p>
        </>
    ); 
};

export default LoginPage;

