import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- Components & Pages ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ResultPage from './components/ResultPage';

// --- Configuration ---
const API_URL = 'http://localhost:5000/api';

// --- Main App Component ---
export default function App() {
    const [page, setPage] = useState('home'); // home, login, register, results
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const res = await axios.get(`${API_URL}/auth/me`);
                    setUser(res.data);
                } catch (err) {
                    console.error("Failed to fetch user", err);
                    handleLogout();
                }
            } else {
                setUser(null);
                delete axios.defaults.headers.common['Authorization'];
            }
        };
        fetchUser();
    }, [token]);

    const handleSetToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setPage('home');
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setError('Please enter a medicine name.');
            return;
        }
        setLoading(true);
        setError('');
        setSearchResults([]);
        try {
            const res = await axios.get(`${API_URL}/medicines/search?query=${searchQuery}`);
            setSearchResults(res.data);
            setPage('results');
        } catch (err) {
            console.error("Search failed", err);
            setError('Could not fetch results. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const navigate = (newPage) => {
        setError('');
        if (newPage === 'home') {
           setSearchQuery('');
           setSearchResults([]);
        }
        setPage(newPage);
    }

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
            <Navbar user={user} navigate={navigate} onLogout={handleLogout} />
            <main className="container mx-auto px-4 py-8">
                {page === 'home' && <HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} loading={loading} error={error} />}
                {page === 'login' && <LoginPage navigate={navigate} setToken={handleSetToken} setError={setError} />}
                {page === 'register' && <RegisterPage navigate={navigate} setToken={handleSetToken} setError={setError} />}
                {page === 'results' && <ResultPage results={searchResults} loading={loading} error={error} query={searchQuery} />}
            </main>
            <Footer />
        </div>
    );
}