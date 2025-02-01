"use client"

import { getProviders, signIn } from "next-auth/react"
import Link from "next/link"
import React, { useEffect, useState } from "react";

const SignIn = () => {
    const [providers, setProviders] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };

        fetchProviders();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // attempt to signIn
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            window.location.href = "/admindashboard";
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-gray-900">
            <h1 className="text-2xl font-bold mb-6 text-blue-500">Admin SignIn</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-blue-100 p-6 rounded shadow-lg max-w-md w-full"
            >
                {error && <p className="text-red-500 mb-4">{error}</p>}

            <label className="block mb-2">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border px-3 py-2 w-full rounded mt-1 text-gray-500"
                        required
                    />
                </label>

                <label className="block mb-2">
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border px-3 py-2 w-full rounded mt-1 text-gray-500"
                        required
                    />
                </label>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
                >
                    Sign In
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

export default SignIn;