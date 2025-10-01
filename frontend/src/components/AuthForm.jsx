import React, { useState } from 'react';

const AuthForm = ({ type, onSubmit, setError }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await onSubmit({ name, email, password });
        } catch (err) {
            const message = err.response?.data?.msg || `An error occurred during ${type}.`;
            setError(message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6">{type === 'login' ? 'Login' : 'Create Account'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {type === 'register' && (
                     <div>
                        <label className="block text-sm font-medium text-slate-600">Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-slate-600">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600">Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                </div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-400">
                    {loading ? 'Processing...' : (type === 'login' ? 'Login' : 'Register')}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;