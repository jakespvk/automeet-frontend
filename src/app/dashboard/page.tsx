"use client";
import NewUserDashboard from "./NewUserDashboard";
import SQLiteDashboard from "./SQLiteDashboard";
import ActiveCampaignDashboard from "./ActiveCampaignDashboard";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
	const { user } = useAuth();

	console.log(user);
	const db_provider = user?.db_type;


	if (!user) return <div className="flex items-center justify-center h-screen">Not logged in</div>;
	if (db_provider === undefined) return <NewUserDashboard />;
	else if (db_provider === 'SQLite') return <SQLiteDashboard />;
	else if (db_provider === 'ActiveCampaign') return <ActiveCampaignDashboard />;
}
