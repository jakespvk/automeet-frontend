import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function DatabaseForm_Attio({ provider, providerLink }: { provider: string, providerLink: string }) {
    const user = useAuth().user;

    if (!user) return <div className="flex items-center justify-center">Not logged in</div>;

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const db_type = provider;
        const attio_token = e.currentTarget.attio_token.value;
        if (!user) return <div className="flex items-center justify-center">Not logged in</div>;
        const email = user.email;
        const response = await fetch(`${API_BASE_URL}/setup-subscription/${db_type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, db_type, attio_token }),
        })
            .then(response => response.json())
    }

    return (
        <div className="w-[400px] mt-5">
            <h2><strong>Provider:</strong> {provider}</h2>
            <form id="apiUrlForm" onSubmit={(e) => handleSubmit(e)}>
                <Input className="text-gray-950 mt-3" id="attio_token" placeholder="API Token..." />
                <p className="my-2 ml-1 text-sm">Instructions for <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" href={providerLink}>{provider}</a></p>
                <p className="my-4">Make sure to give &apos;READ&apos; access only for added security, and grant access to the &apos;Records&apos; Scope</p>
                <div className="flex items-center justify-center">
                    <Button className="btn mt-3 w-36" type="submit">Save</Button>
                </div>
            </form>
        </div>
    )
}

