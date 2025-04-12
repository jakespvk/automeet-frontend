import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RequestNewProvider() {
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const form = document.getElementById('requestProviderForm');
        if (form) {
            form.innerHTML = '<p class="text-green-500">Request Submitted</p>';
        }
    }

    return (
        <div className="w-[370px]">
            <h2>Request New Provider</h2>
            <p className="my-2 text-sm">We're working on adding support for more providers, but if you'd like to see a specific one, please let us know!</p>
            <form id="requestProviderForm">
                <div className="flex items-center justify-center">
                    <Input className="text-gray-950 my-2" placeholder="Database provider..." />
                    <Button onClick={handleSubmit} type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
}
