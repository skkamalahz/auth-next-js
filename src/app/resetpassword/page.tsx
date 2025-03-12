"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [resetComplete, setResetComplete] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetpassword", { token, password });
            toast.success("Password reset successful");
            setResetComplete(true);
        } catch (error: any) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.error || "Something went wrong");
            setError(error.response?.data?.error || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-6">Reset Password</h1>
            
            {!token && (
                <div className="text-center">
                    <p className="text-red-500 mb-4">Invalid or missing reset token</p>
                    <Link href="/forgotpassword" className="text-blue-500 hover:underline">
                        Request a new password reset
                    </Link>
                </div>
            )}
            
            {token && resetComplete && (
                <div className="text-center">
                    <p className="text-green-500 mb-4">Password has been reset successfully!</p>
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Go to Login
                    </Link>
                </div>
            )}
            
            {token && !resetComplete && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}
                    
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1">New Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            className="p-2 border rounded"
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="mb-1">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            required
                            className="p-2 border rounded"
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                        disabled={loading || !password || !confirmPassword}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            )}
        </div>
    );
} 