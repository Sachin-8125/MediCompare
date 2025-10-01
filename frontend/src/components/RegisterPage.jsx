import React from "react";
import axios from 'axios';
import AuthForm from "./AuthForm";

const API_URL = 'http://localhost:5000/api';

const RegisterPage = ({navigate, setToken, setError}) => {
    const handleRegister = async({name,email,password}) => {
        const res = await axios.post(`${API_URL}/auth/register`,{name,email,password});
        setToken(res.data.token);
        navigate('home');
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