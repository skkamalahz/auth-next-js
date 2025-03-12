"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.get(`/api/users/verifyemail?token=${token}`);
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Verify Email</h1>
            <h2 className="text-2xl p-2 bg-orange-500 text-black rounded-md mt-4">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-2xl bg-green-500 text-white p-2 rounded-md mt-4 mb-4">Email verified successfully</h2>
                    <Link href="/login" className="text-2xl bg-blue-500 text-white p-2 rounded-md">
                    Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-white p-2 rounded-md mt-4">Email Not Verified</h2>
                </div>
            )}
            
        </div>
    )
}
