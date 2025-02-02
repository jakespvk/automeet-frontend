"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import DatabaseForm from "./DatabaseForm";
import RequestNewProvider from "./RequestNewProvider";
import DashboardLogoutButton from "./dashboardLogoutButton";

export default function NewUserDashboard() {
	const { email, token, logout } = useAuth();
	const [selectedProvider, setSelectedProvider] = useState('');

	return (
		<div>
			<div className="w-full h-svh flex justify-center items-center">
				<div className="glass-card">
					<div className="glass-card-contents">
						<h2 className="text-center font-semibold text-2xl mb-9">Dashboard</h2>
						<Select value={selectedProvider} onValueChange={setSelectedProvider}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select a database provider" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="SQLite">SQLite</SelectItem>
								<SelectItem value="ActiveCampaign">ActiveCampaign</SelectItem>
								<SelectItem value="Other">Other</SelectItem>
							</SelectContent>
						</Select>

						<div className="my-4">
							{selectedProvider === 'SQLite' ? <DatabaseForm provider="SQLite" /> : (selectedProvider === 'ActiveCampaign' ? <DatabaseForm provider="ActiveCampaign" /> : (selectedProvider === 'Other' ? <RequestNewProvider /> : <></>))}
						</div>

						{selectedProvider === '' ? <div className="mt-12"><DashboardLogoutButton /></div> : <DashboardLogoutButton />}
					</div>
				</div>
			</div>
		</div >
	)
}
