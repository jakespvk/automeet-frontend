"use client";
//import { useAuth } from "@/context/AuthContext";
import NewUserDashboard from "./NewUserDashboard";
import SQLiteDashboard from "./SQLiteDashboard";
import ActiveCampaignDashboard from "./ActiveCampaignDashboard";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
	const { email, token, isLoggedIn } = useAuth();
	let user = undefined;
	let db_provider = undefined;
	useEffect(() => {
		async function getUser() {
			const response = await fetch(`/dashboard/${email}/${token}`, {
				//const response = await fetch(`http://localhost:8000/dashboard/jakespvk%40gmail.com/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYWtlc3B2a0BnbWFpbC5jb20iLCJleHAiOjE3Mzc4Njk4NTd9.MZsgR4m2qk8xuqRXJzezgJ-qdba1Hy-wPCSwgmDgyOw`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();

			console.log(data);
			user = data.user;
			db_provider = user.db_provider;
			return user;
		}
	}, [user]);


	if (!isLoggedIn) return <div className="flex items-center justify-center h-screen">Not logged in</div>;
	if (db_provider === undefined) return <NewUserDashboard />;
	else if (db_provider === 'SQLite') return <SQLiteDashboard />;
	else if (db_provider === 'ActiveCampaign') return <ActiveCampaignDashboard />;
}
