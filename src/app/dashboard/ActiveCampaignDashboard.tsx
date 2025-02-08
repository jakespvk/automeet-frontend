"use client";

import DashboardLogoutButton from "./dashboardLogoutButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function ActiveCampaignDashboard() {
	const { user } = useAuth();
	const [editMode, setEditMode] = useState(false);
	let provider = "ActiveCampaign";
	let providerInstructionLink = "https://www.sqlite.org/download.html";

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		if (!user) return;
		e.preventDefault();
		setEditMode(false);
		const email = user.email;
		const api_url = e.currentTarget.apiUrl.value;
		const api_key = e.currentTarget.apiKey.value;
		console.log(JSON.stringify({ email, api_url, api_key }));
		await fetch('/set-user-db-details', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, api_url, api_key }),
		})
			.then(response => response.json())
			.then(data => console.log(data));
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="w-[400px] mt-5">
				<h2><strong>Provider:</strong> {provider}</h2>
				{editMode
					?
					<form onSubmit={(e) => handleSubmit(e)}>
						<Input className="text-gray-950 mt-3" id="apiUrl" placeholder="API URL..." />
						<Input className="text-gray-950 mt-5" id="apiKey" placeholder="API Key..." />
						<p className="my-2 ml-1 text-sm">Instructions for <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" href={providerInstructionLink}>{provider}</a></p>
						<div className="flex items-center justify-center">
							<Button className="btn mt-3 w-36" type="submit">Save</Button>
						</div>
					</form>
					:
					<>
						<Input disabled className="text-gray-950 mt-3" id="apiUrl" placeholder="API URL..." value={user?.db_type} />
						<Input disabled className="text-gray-950 mt-5" id="apiKey" placeholder="API Key..." value={user?.db_type} />
						<p className="my-2 ml-1 text-sm">Instructions for <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" href={providerInstructionLink}>{provider}</a></p>
						<div className="flex items-center justify-center">
							<Button className="btn mt-3 w-36" onClick={() => setEditMode(true)}>Edit</Button>
						</div>
					</>
				}
			</div>
			<DashboardLogoutButton />
		</div >
	)
}
