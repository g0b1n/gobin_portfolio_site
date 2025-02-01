"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // call nextauth signIn function with "credentials" provider
        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (result?.error) {
            setError("!!! Invalid credentials. Please try again later !!!");
        } else {
            router.push("/admindashboard");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-gray-900">
            <h1 className="text-2xl font-bold mb-6 text-blue-500">Admin Login</h1>
            <form onSubmit={handleSubmit}
                className="bg-blue-100 p-6 rounded shadow-lg max-w-md w-full"    
            >
                <div>
                    <label className="block mb-2">Username</label>
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border px-3 py-2 w-full rounded mt-1 text-gray-500"
                        required    
                    />
                </div>
                <div>
                    <label className="block mb-2">Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border px-3 py-2 w-full rounded mt-1 text-gray-500"
                        required    
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4">
                    Login
                </button>
            </form>

            <Link href="/">
                <button className="mt-6 px-4 py-2 bg-blue-500 text-gray-100 rounded hover:bg-blue-600">
                    Back to Home Page
                </button>
            </Link>
        </div>
    )
}