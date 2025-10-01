import React from 'react';

const HomePage = ({ searchQuery, setSearchQuery, handleSearch, loading, error }) => (
    <div className="text-center max-w-2xl mx-auto mt-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Find the Best Price for Your Medicines</h2>
        <p className="text-lg text-slate-600 mb-8">Compare prices from pharmacies near you and save money on your prescriptions.</p>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter medicine name (e.g., Paracetamol)"
                className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <button type="submit" disabled={loading} className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors disabled:bg-teal-400 disabled:cursor-not-allowed">
                {loading ? 'Searching...' : 'Search'}
            </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
);

export default HomePage;