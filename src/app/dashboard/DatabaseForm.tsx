import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function DatabaseForm({ provider }: { provider: string }) {
	const user = useAuth().user;

	if (!user) return <div className="flex items-center justify-center">Not logged in</div>;
	let providerInstructionLink = "";
	if (provider === 'SQLite') {
		providerInstructionLink = 'https://www.sqlite.org/download.html';
	} else if (provider === 'ActiveCampaign') {
		providerInstructionLink = 'https://help.activecampaign.com/hc/en-us/articles/207317590-Getting-started-with-the-API#h_01HJ6REM2YQW19KYPB189726ST';
	}

	const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		// e.preventDefault();
		const db_type = provider;
		const api_url = e.currentTarget.apiUrl.value;
		const api_key = e.currentTarget.apiKey.value;
		if (!user) return <div className="flex items-center justify-center">Not logged in</div>;
		const email = user.email;
		const response = await fetch(`${API_BASE_URL}/setup-subscription`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, db_type, api_url, api_key }),
		})
			.then(response => response.json())
			.then(data => console.log(data));
		console.log(response);
	}

	return (
		<div className="w-[400px] mt-5">
			<h2><strong>Provider:</strong> {provider}</h2>
			<form id="apiUrlForm" onSubmit={(e) => handleSubmit(e)}>
				<Input className="text-gray-950 mt-3" id="apiUrl" placeholder="API URL..." />
				<Input className="text-gray-950 mt-5" id="apiKey" placeholder="API Key..." />
				<p className="my-2 ml-1 text-sm">Instructions for <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" href={providerInstructionLink}>{provider}</a></p>
				<div className="flex items-center justify-center">
					<Button className="btn mt-3 w-36" type="submit">Save</Button>
				</div>
			</form>
		</div>
	)
}

