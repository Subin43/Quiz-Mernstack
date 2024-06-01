import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Header from '../Header';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = () => {
        if (!username || !password) {
            enqueueSnackbar("Username and password are required.", { variant: 'error' });
            return; // Prevent navigation
        }
        // Name validation 
        if (username.length < 4 || username.length > 16) {
            enqueueSnackbar("Invalid username length!", { variant: 'error' });
            return; // Prevent navigation
        }
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            enqueueSnackbar("Username must contain only alphanumeric characters!", { variant: 'error' });
            return; // Prevent navigation
        }
        // Password validation
        if (password.length < 8) {
            enqueueSnackbar("Password length should be at least 8", { variant: 'error' });
            return; // Prevent navigation
        }
        if (!/[a-zA-Z]/.test(password)) {
            enqueueSnackbar("Password must contain at least one letter.", { variant: 'error' });
            return; // Prevent navigation
        }
        if (!/[0-9]/.test(password)) {
            enqueueSnackbar("Password must contain at least one number.", { variant: 'error' });
            return; // Prevent navigation
        }

        // If no errors, proceed to navigate
        navigate("/quizes", { state: { username } });
    };

  

    return (
        <div>
            <Header />
            <div className="py-20">
                <div className="p-4 px-2 flex flex-col my-15 justify-center items-center">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center mb-4">
                            <label className="font-bold mr-2">Username : </label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="px-4 py-2 rounded border border-gray-300 bg-gray-200"
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="font-bold mr-2">Password : </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="px-4 py-2 rounded border border-gray-300 bg-gray-200"
                            />
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleSubmit}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
