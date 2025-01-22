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
import { useState } from "react";
import DatabaseForm from "./DatabaseForm";

export default function Dashboard() {
	const { logout } = useAuth();
	const [selectedProvider, setSelectedProvider] = useState('');

	console.log(selectedProvider);

	return (
		<div>
			<div className="w-full h-svh flex justify-center items-center">
				<div className="glass-card">
					<div className="glass-card-contents">
						<h2 className="text-center text-xl mb-3">Dashboard</h2>
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

						{selectedProvider === 'SQLite' ? <DatabaseForm provider="SQLite" /> : (selectedProvider === 'ActiveCampaign' ? <DatabaseForm provider="ActiveCampaign" /> : <></>)}

						<div className="flex items-center justify-center">
							<Button className="mt-7" variant="outline" onClick={logout}>Logout</Button>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}
