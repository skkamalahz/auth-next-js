"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from  "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log("Logout Error", error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
       const res = await axios.get("/api/users/me")
       console.log("User Details", res.data);
         setData(res.data.data._id);
    }

    return (
        <div className="flex flex-col items-center min-h-screen justify-center py-2">
            <h1 className="text-center text-2xl">Profile</h1>
            <hr />
            <hr />
            <p>Profile Page</p>
            <h2 className="p-2 rounded-2xl bg-blue-500 mt-4">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button onClick={logout} className="bg-red-500 text-white p-2 rounded mt-6">Log Out</button>

            <button onClick={getUserDetails} className="bg-purple-700 text-white p-2 rounded mt-6">Get User Details</button>
        </div>
    );
}