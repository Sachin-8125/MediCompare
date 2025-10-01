import React from 'react';

const ResultsPage = ({ results, loading, error, query }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Search Results for "{query}"</h2>
            {loading && <p className="text-center text-lg">Loading results...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && results.length === 0 && <p className="text-center text-slate-500 mt-8">No results found. Try a different medicine name.</p>}
            {!loading && results.length > 0 && (
                <div className="space-y-4">
                    {results.map(result => (
                        <div key={result.id} className="bg-white p-6 rounded-lg shadow-md border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                            <div className="md:col-span-2">
                                <h3 className="text-xl font-semibold text-teal-700">{result.medicine.name}</h3>
                                <p className="text-slate-500">Generic: {result.medicine.genericName || 'N/A'}</p>
                                <p className="text-sm text-slate-400">by {result.medicine.manufacturer}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">{result.pharmacy.name}</h4>
                                <p className="text-slate-600">{result.pharmacy.city}, {result.pharmacy.state}</p>
                            </div>
                            <div className="text-center md:text-right">
                                <p className="text-3xl font-bold text-green-600">₹{result.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResultsPage;