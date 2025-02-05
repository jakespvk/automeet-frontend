import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function DatabaseForm({ provider }: { provider: string }) {

	let providerInstructionLink = "";
	if (provider === 'SQLite') {
		providerInstructionLink = 'https://www.sqlite.org/download.html';
	} else if (provider === 'ActiveCampaign') {
		providerInstructionLink = 'https://help.activecampaign.com/hc/en-us/articles/207317590-Getting-started-with-the-API#h_01HJ6REM2YQW19KYPB189726ST';
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const apiUrl = e.currentTarget.apiUrl.value;
		const apiKey = e.currentTarget.apiKey.value;
		console.log(apiUrl, apiKey);
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

