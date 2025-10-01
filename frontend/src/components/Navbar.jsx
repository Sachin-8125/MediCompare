import React from 'react';

const Navbar = ({ user, navigate, onLogout }) => (
    <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 onClick={() => navigate('home')} className="text-2xl font-bold text-teal-600 cursor-pointer">MediCompare</h1>
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="text-slate-600 hidden sm:block">Welcome, {user.name}!</span>
                        <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">Logout</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate('login')} className="px-4 py-2 text-slate-600 rounded-md hover:bg-slate-100 transition-colors">Login</button>
                        <button onClick={() => navigate('register')} className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">Register</button>
                    </>
                )}
            </div>
        </nav>
    </header>
);

export default Navbar;
