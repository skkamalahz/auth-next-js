"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", { email });
            toast.success("Password reset email sent");
            setEmailSent(true);
        } catch (error: any) {
            console.log(error.response.data);
            toast.error(error.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-6">Forgot Password</h1>
            
            {emailSent ? (
                <div className="text-center">
                    <p className="text-green-500 mb-4">Password reset email has been sent!</p>
                    <p className="mb-4">Please check your email for the reset link.</p>
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Return to Login
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="p-2 border rounded"
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                        disabled={loading || !email}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                    
                    <div className="text-center mt-4">
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
} 