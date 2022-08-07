import { useRouter } from 'next/router';
import { FC, FormEvent, useState } from 'react';

const Login: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        // const data = await res.json();
        if (res.status !== 200) return alert('Wrong credentials');
        const token = await res.text();
        localStorage.setItem('device-list-token', token);
        router.push('/');
    };
    return (
        <div>
            <h1>Login Here</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
