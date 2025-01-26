"use client";
//import { useAuth } from "@/context/AuthContext";
import NewUserDashboard from "./NewUserDashboard";
import SQLiteDashboard from "./SQLiteDashboard";
import ActiveCampaignDashboard from "./ActiveCampaignDashboard";
import { useEffect } from "react";

export default function Dashboard() {
	//const { email, token } = useAuth();
	const user = undefined;
	useEffect(() => {
		async function getUser() {
			//const response = await fetch(`/dashboard/${email}/${token}`, {
			const response = await fetch(`http://localhost:8000/dashboard/jakespvk%40gmail.com/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYWtlc3B2a0BnbWFpbC5jb20iLCJleHAiOjE3Mzc4Njk4NTd9.MZsgR4m2qk8xuqRXJzezgJ-qdba1Hy-wPCSwgmDgyOw`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();

			console.log(data);
			const user = data.user;
			return user;
		}
	}, [user]);

	let db_provider = undefined;
	//if (user !== undefined) { db_provider = user.db_provider; }


	if (db_provider === undefined) return <NewUserDashboard />;
	else if (db_provider === 'SQLite') return <SQLiteDashboard />;
	else if (db_provider === 'ActiveCampaign') return <ActiveCampaignDashboard />;
}
