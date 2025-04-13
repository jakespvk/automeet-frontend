"use client";

import { X } from "lucide-react"
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

export default function LoggedInDashboard({ provider, providerInstructionLink }: { provider: string, providerInstructionLink: string }) {
  let { user, checkAuth } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [pollFrequency, setPollFrequency] = useState(user?.poll_frequency);
  const router = useRouter();

  let activeColumns = user?.active_columns;

  function handleCheckedChange(column: string) {
    if (!activeColumns) return;
    const idx = activeColumns.indexOf(column);
    if (idx === -1) {
      activeColumns.push(column);
    } else {
      activeColumns.splice(idx, 1);
    }
  }

  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   await props.handleSubmit_Provider(e);
  // }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!user) return;
    e.preventDefault();

    setEditMode(false);
    if (pollFrequency !== undefined) {
      user.poll_frequency = pollFrequency;
    }
    await fetch(`${API_BASE_URL}/set-user-db-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    })
      .then(response => response.json())
      .then(data => user = data.user);
    // checkAuth();
  }

  async function removeProvider() {
    if (confirm("Are you sure you'd like to remove your database provider? (You will have to re-enter your API details)")) {

      if (!user) return; else {
        await fetch(`${API_BASE_URL}/provider/${user.email}`, {
          method: 'DELETE',
        })
          .then(response => response.json())

        checkAuth();
        router.replace('/dashboard');
      }

    }
  }

  return (
    <div className="flex flex-col items-center justify-center pb-10 [@media(min-height:1350px)]:pb-0 [@media(min-height:1350px)]:h-svh">
      <div className="[@media(min-height:1450px)]:hidden w-screen h-24"></div>
      <div className="md:glass-card md:px-10 md:py-6">
        <div className="md:w-[400px]">
          <h1 className="text-2xl md:text-4xl text-center mb-4">Dashboard</h1>
          <div className="flex items-center mb-2">
            <h2 className="mb-1 md:text-lg"><strong>Provider:</strong> {provider}</h2>
            <button className="ml-2.5 p-1 -translate-y-0.5 rounded-md bg-red-700" onClick={() => removeProvider()}>
              <X className="h-4 w-4" />
            </button>
          </div>
          {editMode
            ?
            <form onSubmit={(e) => handleSubmit(e)}>
              <label className="text-gray-300 mr-auto">Columns:</label>
              {
                user?.columns.map((column: string) => (
                  <div className="flex items-center justify-start my-2 ml-2">
                    <Checkbox className="disabled:bg-neutral-500 ml-4" onCheckedChange={() => handleCheckedChange(column)} defaultChecked={(user?.active_columns.includes(column)) ? true : false} id={column} />
                    <label className="ml-2" htmlFor={column}>{column}</label>
                  </div>
                ))
              }
              <div className="flex mt-4 md:mt-0 flex-col md:flex-row grow items-baseline align-center">
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
              <label className="text-gray-300 mr-auto">Columns:</label>
              {
                user?.columns.map((column: string) => (
                  <div className="flex items-center justify-start my-2 ml-2">
                    <Checkbox disabled className="disabled:bg-neutral-500 ml-4" defaultChecked={(user?.active_columns.includes(column)) ? true : false} id={column} />
                    <label className="ml-2" htmlFor={column}>{column}</label>
                  </div>
                ))
              }
              <div className="flex mt-4 md:mt-0 flex-col md:flex-row grow items-baseline align-center">
                <label htmlFor="pollFrequency" className="text-gray-300 mr-auto">Poll Frequency:</label>
                <Select disabled value={pollFrequency} defaultValue={user?.poll_frequency} onValueChange={(value) => { setPollFrequency(value); }}>
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
