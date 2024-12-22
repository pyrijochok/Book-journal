import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function LogIn(){
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e)=>{
        e.preventDefault();
        console.log('logged');
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nick, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // setMessage(`Welcome, ${data.user.nick}!`);
                const userId = data.user.id;
                console.log(userId);
                navigate(`/journal/${userId}`);
                // navigate('/journal');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error('Login error:', error);
        }
    }

    const openRegister = ()=>{
        navigate("/register");
    }

    return(
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Nickname:</label>
                    <input
                        type="text"
                        value={nick}
                        onChange={(e) => setNick(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Log in</button>
            </form>
            <button onClick={openRegister}>Register</button>
            {message && <p>{message}</p>}
        </div>
    );
}