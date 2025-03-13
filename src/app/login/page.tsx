"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { CustomError } from "@/types/error";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => { 
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login Success", response.data);
            toast.success("Login successful");
            router.push("../profile");
        } catch (error: unknown) {
            const customError = error as CustomError;
            console.log("Login Error", customError.message);
            toast.error(customError.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center min-h-screen justify-center py-2">
            <h1 className="text-center text-2xl">{loading ? "Logging in..." : "Login Page"}</h1>
            <hr />
            <hr />

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

            <button 
                onClick={onLogin} 
                className="mt-4 p-2 bg-blue-500 text-white rounded"
                disabled={loading}
            >
                Login Here
            </button>

            <Link href="/forgotpassword" className="mt-2 text-blue-500 hover:underline">
                Forgot Password?
            </Link>

            <hr />
            <hr />
            
            <Link href="/signup" className="mt-4 p-2 bg-amber-700 text-white rounded">
                Visit Signup Page
            </Link>
        </div>
    );
}