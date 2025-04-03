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
} from "@/components/ui/select"
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ActiveCampaignDashboard() {
    let { user, checkAuth } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [pollFrequency, setPollFrequency] = useState(user?.poll_frequency) || "Monthly";
    const provider = "ActiveCampaign";
    const providerInstructionLink = 'https://help.activecampaign.com/hc/en-us/articles/207317590-Getting-started-with-the-API#h_01HJ6REM2YQW19KYPB189726ST';
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        if (!user) return;
        e.preventDefault();

        setEditMode(false);
        user.api_url = e.currentTarget.apiUrl.value;
        user.api_key = e.currentTarget.apiKey.value;
        if (pollFrequency !== undefined) {
            user.poll_frequency = pollFrequency;
        }
        console.log(JSON.stringify({ user }));
        await fetch(`${API_BASE_URL}/set-user-db-details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),
        })
            .then(response => response.json())
            .then(data => user = data.user);
    }

    async function removeProvider() {
        if (!user) return; else {
            await fetch(`${API_BASE_URL}/provider/${user.email}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(data => console.log(data));

            checkAuth();
            router.replace('/dashboard');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center pb-10 [@media(min-height:1350px)]:pb-0 [@media(min-height:1350px)]:h-svh">
            <div className="[@media(min-height:1450px)]:hidden w-screen h-24"></div>
            <div className="md:glass-card p-10">
                <div className="md:w-[400px]">
                    <h1 className="text-2xl md:text-4xl text-center mb-7">Dashboard</h1>
                    <div className="flex items-baseline">
                        <h2 className="mb-1 md:text-lg"><strong>Provider:</strong> {provider}</h2>
                        <button className="ml-2.5 px-2 py-0.4 rounded-md -translate-y-0.5 bg-gray-600" onClick={() => removeProvider()}>x</button>
                    </div>
                    {editMode
                        ?
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="flex items-baseline justify-start align-center">
                                <label htmlFor="apiUrl" className="text-gray-300 mr-auto text-nowrap">API URL:</label>
                                <Input className="text-gray-950 mt-4 md:w-[80%] w-fit ml-2" id="apiUrl" placeholder="API URL..." defaultValue={user?.api_url} />
                            </div>
                            <div className="flex items-baseline justify-start mt-4 align-center">
                                <label htmlFor="apiKey" className="text-gray-300 mr-auto text-nowrap">API Key:</label>
                                <Input className="text-gray-950 md:w-[80%] w-fit ml-2" id="apiKey" placeholder="API Key..." defaultValue={user?.api_key} />
                            </div>
                            <p className="mt-2 mb-5 md:ml-[25%] ml-[28%] text-sm">Instructions for <a className="text-blue-600 hover:underline text-sm" target="_blank" rel="noopener noreferrer" href={providerInstructionLink}>{provider}</a></p>
                            <label className="text-gray-300 mr-auto">Columns:</label>
                            {
                                user?.columns.map((column: string) => (
                                    <div className="flex items-center justify-start my-2 ml-2">
                                        <Checkbox className="disabled:bg-neutral-500 ml-4" defaultChecked={(user?.active_columns.includes(column)) ? true : false} id={column} />
                                        <label className="ml-2" htmlFor={column}>{column}</label>
                                    </div>
                                ))
                            }
                            <div className="flex grow items-baseline align-center">
                                <label htmlFor="pollFrequency" className="text-gray-300 mr-auto">Poll Frequency:</label>
                                <Select value={pollFrequency} defaultValue={user?.poll_frequency} onValueChange={(value) => { setPollFrequency(value) }}>
                                    <SelectTrigger className="max-w-56 md:min-w-[180px] mt-4 mb-4">
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
                            <div className="flex items-baseline justify-start align-center">
                                <label htmlFor="apiUrl" className="text-gray-300 mr-auto text-nowrap">API URL:</label>
                                <Input disabled className="text-gray-950 mt-4 md:w-[80%] w-fit ml-2" id="apiUrl" placeholder="API URL..." defaultValue={user?.api_url} />
                            </div>
                            <div className="flex items-baseline justify-start mt-4 align-center">
                                <label htmlFor="apiKey" className="text-gray-300 mr-auto text-nowrap">API Key:</label>
                                <Input disabled className="text-gray-950 md:w-[80%] w-fit ml-2" id="apiKey" placeholder="API Key..." defaultValue={user?.api_key} />
                            </div>
                            <p className="mt-2 mb-5 md:ml-[25%] ml-[28%] text-sm">Instructions for <a className="text-blue-600 hover:underline text-sm" target="_blank" rel="noopener noreferrer" href={providerInstructionLink}>{provider}</a></p>
                            <label className="text-gray-300 mr-auto">Columns:</label>
                            {
                                user?.columns.map((column: string) => (
                                    <div className="flex items-center justify-start my-2 ml-2">
                                        <Checkbox disabled className="disabled:bg-neutral-500 ml-4" defaultChecked={(user?.active_columns.includes(column)) ? true : false} id={column} />
                                        <label className="ml-2" htmlFor={column}>{column}</label>
                                    </div>
                                ))
                            }
                            <div className="flex grow items-baseline align-center">
                                <label htmlFor="pollFrequency" className="text-gray-300 mr-auto">Poll Frequency:</label>
                                <Select disabled value={user?.poll_frequency} defaultValue={user?.poll_frequency} onValueChange={(value) => { setPollFrequency(value) }}>
                                    <SelectTrigger className="max-w-56 md:min-w-[180px] mt-4 mb-4">
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
            </div>
        </div >
    )
}

