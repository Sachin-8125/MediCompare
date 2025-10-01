import React from 'react';

const Footer = () => (
    <footer className="bg-white mt-16 py-6 border-t">
        <div className="container mx-auto text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} MediCompare. All rights reserved.</p>
        </div>
    </footer>
);

export default Footer;