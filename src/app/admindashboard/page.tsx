import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

export default async function AdminDashboard() {
  // Retrieve the session on the server side
  const session = await getServerSession(authOptions);

  // If no session exists, redirect to the login page
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session.user?.name}</p>
      {/* Here you can add your admin functionalities such as adding/updating/deleting projects */}
    </div>
  );
}
