"use client";
// import Image from "next/image"
// import eyeImg from "@/public/eye.png";
// import eyeSlashImg from "@/public/eye-slash.png";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState, FormEvent } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function MobileSignIn() {
    // const [typePassword, setTypePassword] = useState(true);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginEmailSent, setIsLoginEmailSent] = useState(false);

    // const togglePasswordVisibility = () => {
    // 	setTypePassword((prev) => !prev);
    // };

    async function handleSignIn(event: FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/signin/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to send magic link');
            }

            const data = await response.json();
            setIsLoginEmailSent(true);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <form className="flex flex-col items-center justify-center h-svh mx-10 gap-4 py-4" onSubmit={handleSignIn}>
                <h1 className="text-xl mb-4">Sign In</h1>
                <Label className="text-sm text-pretty">Enter your email and a link will be sent to log you in.</Label>
                <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@appleseeds.com"
                    className="text-gray-950 col-span-3"
                />
                <Button
                    type="submit"
                    variant="outline"
                    disabled={isLoading}
                    className={isLoginEmailSent ? 'text-green-500' : ''}
                >
                    {isLoginEmailSent ? 'Email Sent!' : (isLoading ? 'Sending...' : 'Sign In')}
                </Button>
            </form>
        </>
    )
};
