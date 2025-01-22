import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function DatabaseForm({ provider }: { provider: string }) {
	let providerInstructionLink = "";
	if (provider === 'SQLite') {
		providerInstructionLink = 'https://www.sqlite.org/download.html';
	} else if (provider === 'ActiveCampaign') {
		providerInstructionLink = 'https://help.activecampaign.com/hc/en-us/articles/207317590-Getting-started-with-the-API#h_01HJ6REM2YQW19KYPB189726ST';
	}
	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		console.log('Submitted');
		const form = document.getElementById('requestProviderForm');
		if (form) {
			form.innerHTML = '<p class="text-green-500">Request Submitted</p>';
		}
	}
	return (
		<div className="w-[400px]">
			<h2><strong>Provider:</strong> {provider}</h2>
			<form id="requestProviderForm">
				<div className="flex items-center justify-center">
					<Input className="text-gray-950 mt-2" placeholder="API URL..." />
					<Input className="text-gray-950 mt-2" placeholder="API Key..." />
					<Button onClick={handleSubmit} type="submit">Submit</Button>
				</div>
				<p className="my-2 ml-1 text-sm">Instructions for <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" href={providerInstructionLink}>{provider}</a></p>
			</form>
		</div>
	)
}
