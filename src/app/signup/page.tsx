"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";


export default function SignupPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const onSignup = async () => { };

    return (
        <div className="flex flex-col items-center min-h-screen justify-center py-2">
            <h1 className="text-center text-2xl">Signup Page</h1>
            <hr />
            <hr />
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                value={user.username}
                placeholder="Enter your username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="mt-2 p-2 border rounded"
            />

            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                value={user.email}
                placeholder="Enter your email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="mt-2 p-2 border rounded"
            />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                value={user.password}
                placeholder="Enter your password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="mt-2 p-2 border rounded"
            />

            <button onClick={onSignup} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Signup
            </button>

            <hr />
            <hr />
            
            <Link href="/login">
                Visit Login Page
            </Link>
            
        </div>
    );
}