"use client";
import { useAuth } from "@/context/AuthContext";
import NewUserDashboard from "./NewUserDashboard";
import SQLiteDashboard from "./SQLiteDashboard";
import ActiveCampaignDashboard from "./ActiveCampaignDashboard";
import AttioDashboard from "./AttioDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  const db_provider = user?.db_type;

  if (!user) return <div className="flex items-center justify-center h-screen">Not logged in</div>;
  if (db_provider === undefined || db_provider === '') return <NewUserDashboard />;
  else if (db_provider === 'SQLite') return <SQLiteDashboard />;
  else if (db_provider === 'ActiveCampaign') return <ActiveCampaignDashboard />;
  else if (db_provider === 'Attio') return <AttioDashboard />;
}
