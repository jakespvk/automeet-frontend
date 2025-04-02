import { useAuth } from "@/context/AuthContext";
import RequestNewProvider from "./RequestNewProvider";
import DatabaseForm_AC from "./DatabaseForm_AC";
import DatabaseForm_Attio from "./DatabaseForm_Attio";

export default function DatabaseForm({ provider }: { provider: string }) {
    const user = useAuth().user;

    if (!user) return <div className="flex items-center justify-center">Not logged in</div>;

    let providerInstructionLink = "";

    if (provider === 'Other') {
        return <RequestNewProvider />
    } else if (provider === 'SQLite') {
        providerInstructionLink = 'https://www.sqlite.org/download.html';
    } else if (provider === 'ActiveCampaign') {
        providerInstructionLink = 'https://help.activecampaign.com/hc/en-us/articles/207317590-Getting-started-with-the-API#h_01HJ6REM2YQW19KYPB189726ST';
        return <DatabaseForm_AC provider={provider} providerLink={providerInstructionLink} />
    } else if (provider === 'Attio') {
        providerInstructionLink = 'dfjsldkfj'
        return <DatabaseForm_Attio provider={provider} providerLink={providerInstructionLink} />
    }
}
