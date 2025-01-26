import { Input } from "@/components/ui/input";
import { useState } from "react";
export default function DatabaseForm({ provider }: { provider: string }) {
	const [apiUrl, setApiUrl] = useState('');
	const [apiKey, setApiKey] = useState('');

	let providerInstructionLink = "";
	if (provider === 'SQLite') {
		providerInstructionLink = 'https://www.sqlite.org/download.html';
	} else if (provider === 'ActiveCampaign') {
		providerInstructionLink = 'https://help.activecampaign.com/hc/en-us/articles/207317590-Getting-started-with-the-API#h_01HJ6REM2YQW19KYPB189726ST';
	}

	function apiUrlHandleKey(event: React.KeyboardEvent) {
		if (event.key === 'Enter') {
			const apiUrl_input = document.getElementById('apiUrl');
			if (apiUrl_input) {
				apiUrl_input.removeAttribute('focus');
			}
		}
	}

	function apiKeyHandleKey(event: React.KeyboardEvent) {
		if (event.key === 'Enter') {
			const apiKey_input = document.getElementById('apiKey');
			if (apiKey_input) {
				apiKey_input.removeAttribute('focus');
			}
		}
	}

	function apiUrlHandleSubmit(event: React.FormEvent) {
		event.preventDefault();
		console.log('Submitted');
	}

	function apiKeyHandleSubmit(event: React.FormEvent) {
		event.preventDefault();
		console.log('Submitted');
	}

	return (
		<div className="w-[400px] mt-5">
			<h2><strong>Provider:</strong> {provider}</h2>
			<form id="apiUrlForm" onSubmit={apiUrlHandleSubmit}>
				<Input className="text-gray-950 mt-3" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} onKeyDown={apiUrlHandleKey} id="apiUrl" placeholder="API URL..." />
			</form>
			<form id="apiKeyForm" onSubmit={apiKeyHandleSubmit}>
				<Input className="text-gray-950 mt-5" value={apiKey} onChange={(e) => setApiKey(e.target.value)} onKeyDown={apiKeyHandleKey} id="apiKey" placeholder="API Key..." />
			</form>
			<p className="my-2 ml-1 text-sm">Instructions for <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" href={providerInstructionLink}>{provider}</a></p>
		</div>
	)
}
