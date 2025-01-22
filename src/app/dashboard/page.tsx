"use client";

import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
	const { logout } = useAuth();
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1>Dashboard</h1>
			<button onClick={logout}>Logout</button>
		</div>
	)
}
