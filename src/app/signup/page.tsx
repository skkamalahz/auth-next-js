"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import toast from "react-hot-toast";
// import { log } from "console";
// import { set } from "mongoose";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [Loading, setLoading] = React.useState(false);

    const onSignup = async () => { 
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.error(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
     };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center min-h-screen justify-center py-2">
            <h1 className="text-center text-2xl">{Loading ? "Loading..." : "Signup Page"}</h1>
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
                {buttonDisabled ? "Please fill all fields" : "Signup"}
            </button>

            <hr />
            <hr />
            
            <Link href="/login" className="mt-4 p-2 bg-amber-700 text-white rounded">
                Visit Login Page
            </Link>
            
        </div> 
    );
}