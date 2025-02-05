"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call NextAuth signIn function with "credentials" provider
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      // Successful login, redirect to the admin dashboard (or home)
      router.push("/admindashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-blue-500">Admin Login</h1>
      <form onSubmit={handleSubmit}
        className="bg-gray-300 p-6 rounded shadow-lg max-w-md w-full"
      >
        <div className="mt-3">
          <label className="block font-bold text-blue-500">Username</label>
          <input
            type="text"
            value={username}
            placeholder="Admin Username"
            onChange={(e) => setUsername(e.target.value)}
            className="border px-3 py-2 w-full rounded text-blue-300"
            required
          />
        </div>
        <div className="mt-3">
          <label className="block font-bold text-blue-500">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Admin Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2 w-full rounded text-gray-500"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
        >Login</button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">Not an Admin of this site?</p>
        <Link href="/">
            <button className="px-4 mt-2 py-2 bg-blue-500 text-gray-100 rounded hover:bg-blue-600">Return Back to Homepage</button>
        </Link>
      </div>
        
    </div>
  );
}
