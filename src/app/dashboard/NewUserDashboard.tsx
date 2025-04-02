"use client";

import { useAuth } from "@/context/AuthContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import DatabaseForm from "./DatabaseForm";
import DashboardLogoutButton from "./dashboardLogoutButton";

export default function NewUserDashboard() {
    const { user } = useAuth();
    const [selectedProvider, setSelectedProvider] = useState(user?.db_type || '');

    return (
        <div>
            <div className="w-full h-svh flex justify-center items-center">
                <div className="glass-card">
                    <div className="glass-card-contents">
                        <h2 className="text-center font-semibold text-2xl mb-9">Dashboard</h2>
                        <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                            <SelectTrigger className="w-[360px]">
                                <SelectValue placeholder="Select a database provider" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SQLite">SQLite</SelectItem>
                                <SelectItem value="ActiveCampaign">ActiveCampaign</SelectItem>
                                <SelectItem value="Attio">Attio</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="my-4">
                            <DatabaseForm provider={selectedProvider} />
                        </div>

                        {selectedProvider === '' ? <div className="mt-12"><DashboardLogoutButton /></div> : <DashboardLogoutButton />}
                    </div>
                </div>
            </div>
        </div >
    )
}
