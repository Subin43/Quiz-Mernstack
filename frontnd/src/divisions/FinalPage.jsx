import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Header from '../components/Header'; // Adjust the import as needed
import Footer from '../components/Footer';
export default function FinalPage() {
    const { state } = useLocation(); // Use useLocation to access the state
    const { score } = state || { score: 0 }; // Default to 0 if state is undefined

    // Determine the color based on the score
    let scoreColor = 'text-blue-600';
    if (score > 8) {
        scoreColor = 'text-green-500'; // Highlight high scores in green
    } else if (score < 5) {
        scoreColor = 'text-red-500'; // Highlight low scores in red
    }

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                <div className="text-center mb-12">
                    <p className="text-2xl font-bold ">You Scored</p>
                    <p className={`text-4xl font-extrabold ${scoreColor}`}>{score}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
