"use client";
import { useAuth } from "@/context/AuthContext";
import NewUserDashboard from "./NewUserDashboard";
import SQLiteDashboard from "./SQLiteDashboard";
import LoggedInDashboard from "./LoggedInDashboard";
import { SkeletonCard } from "@/components/ui/SkeletonCard"
import AuthButtons from "@/components/ui/authButtons";

export default function Dashboard() {
  const { user, loading } = useAuth();

  const db_provider = user?.db_type;
  let providerInstructionLink = "";
  switch (db_provider) {
    case ("Attio"):
      providerInstructionLink = "FIX ME";
    case ("ActiveCampaign"):
      providerInstructionLink = "https://help.activecampaign.com/hc/en-us/articles/207317590-Getting-started-with-the-API#h_01HJ6REM2YQW19KYPB189726ST";
  }

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <SkeletonCard />
    </div>
  );
  if (!user) return <div className="flex items-center justify-center h-screen"><p>nice try, bucko.</p><div className="flex mx-3"><AuthButtons /></div></div>;

  if (db_provider === undefined || db_provider === '') return <NewUserDashboard />;
  else if (db_provider === 'SQLite') return <SQLiteDashboard />;
  else return <LoggedInDashboard
    provider={db_provider}
    providerInstructionLink={providerInstructionLink}
  />;
}
