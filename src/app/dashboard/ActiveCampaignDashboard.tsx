"use client";

import DashboardLogoutButton from "./dashboardLogoutButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectLabel,
} from "@/components/ui/select"
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ActiveCampaignDashboard() {
	const { user } = useAuth();
	const [editMode, setEditMode] = useState(false);
	const [pollFrequency, setPollFrequency] = useState(user?.poll_frequency);
	const provider = "ActiveCampaign";
	const providerInstructionLink = 'https://help.activecampaign.com/hc/en-us/articles/207317590-Getting-started-with-the-API#h_01HJ6REM2YQW19KYPB189726ST';

	function handleColumnChange(column: string, checked: any) {
		if (!user) return;
		if (checked) {
			user.active_columns.push(column);
		} else {
			user.active_columns = user?.active_columns.filter((c) => c !== column);
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		if (!user) return;
		e.preventDefault();

		setEditMode(false);
		user.api_url = e.currentTarget.apiUrl.value;
		user.api_key = e.currentTarget.apiKey.value;
		user.poll_frequency = e.currentTarget.pollFrequency.value;
		console.log(JSON.stringify({ user }));
		await fetch(`${API_BASE_URL}/set-user-db-details`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user }),
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
						<Input className="text-gray-950 mt-3" id="apiUrl" placeholder="API URL..." defaultValue={user?.api_url} />
						<Input className="text-gray-950 mt-5" id="apiKey" placeholder="API Key..." defaultValue={user?.api_key} />
						<p className="mt-2 mb-3 ml-1 text-sm">Instructions for <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" href={providerInstructionLink}>{provider}</a></p>
						{user?.columns.map((column) => (
							<div className="flex items-center justify-start my-2 ml-4">
								<Checkbox
									className="disabled:bg-neutral-500"
									defaultChecked={(user?.active_columns.includes(column)) ? true : false}
									onCheckedChange={(checked) => handleColumnChange(column, checked)}
									id={column}
								/>
								<label className="ml-2" htmlFor={column}>{column}</label>
							</div>
						))}
						<div className="flex grow items-baseline align-center mx-4">
							<label htmlFor="pollFrequency" className="text-gray-300 mt-3 mr-auto">Poll Frequency:</label>
							<Select value={pollFrequency} defaultValue={pollFrequency} onValueChange={(value) => setPollFrequency(value)}>
								<SelectTrigger className="min-w-[180px] max-w-[65%] my-4">
									<SelectValue placeholder="Select a poll frequency" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Daily">Daily</SelectItem>
									<SelectItem value="Weekly">Weekly</SelectItem>
									<SelectItem value="Monthly">Monthly</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center justify-center mt-5 mb-3">
							<Button className="btn w-36" type="submit">Save</Button>
						</div>
					</form>
					:
					<>
						<Input disabled className="text-gray-950 mt-3 disabled:text-neutral-50" id="apiUrl" placeholder="API URL..." value={user?.api_url} />
						<Input disabled className="text-gray-950 mt-5 disabled:text-neutral-50" id="apiKey" placeholder="API Key..." value={user?.api_key} />
						<p className="mt-2 mb-3 ml-1 text-sm">Instructions for <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" href={providerInstructionLink}>{provider}</a></p>
						{user?.columns.map((column) => (
							<div className="flex items-center justify-start my-2 ml-4">
								<Checkbox className="disabled:bg-neutral-500" defaultChecked={(user?.active_columns.includes(column)) ? true : false} disabled id={column} />
								<label className="ml-2" htmlFor={column}>{column}</label>
							</div>
						))}
						<div className="flex grow items-baseline align-center mx-4">
							<label htmlFor="pollFrequency" className="text-gray-300 mt-3 mr-auto">Poll Frequency:</label>
							<Select disabled value={pollFrequency} defaultValue={pollFrequency} onValueChange={(value) => setPollFrequency(value)}>
								<SelectTrigger className="min-w-[180px] max-w-[65%] my-4">
									<SelectValue placeholder="Select a poll frequency" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Daily">Daily</SelectItem>
									<SelectItem value="Weekly">Weekly</SelectItem>
									<SelectItem value="Monthly">Monthly</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex items-center justify-center mt-5 mb-3">
							<Button className="btn w-36" onClick={() => setEditMode(true)}>Edit</Button>
						</div>
					</>
				}
			</div>
			<DashboardLogoutButton />
		</div >
	)
}

