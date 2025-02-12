"use client";
import Image from "next/image"
import eyeImg from "@/public/eye.png";
import eyeSlashImg from "@/public/eye-slash.png";

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState, FormEvent } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AuthButtons() {
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
			console.log('Success:', data.message);
			setIsLoginEmailSent(true);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setIsLoading(false);
		}
	}

	async function handleSignUp(event: FormEvent) {
		event.preventDefault();
		setIsLoading(true);

		try {
			const response = await fetch(`${API_BASE_URL}/auth/signup/`, {
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
			console.log('Success:', data.message);
			setIsLoginEmailSent(true);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button className="px-4 py-2 hover:text-blue-600">Sign In</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] bg-black">
					<form onSubmit={handleSignIn}>
						<DialogHeader>
							<DialogTitle>Sign In</DialogTitle>
							<DialogDescription>
								Enter your email and a link will be sent to log you in.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="email" className="text-right">
									Email
								</Label>
								<Input
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="john@appleseeds.com"
									className="text-gray-950 col-span-3"
								/>
							</div>
						</div>
						<DialogFooter>
							<Button
								type="submit"
								disabled={isLoading}
								className={isLoginEmailSent ? 'text-green-500' : ''}
							>
								{isLoginEmailSent ? 'Email Sent!' : (isLoading ? 'Sending...' : 'Sign In')}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog >
			<Dialog>
				<DialogTrigger asChild>
					<Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700">Sign Up</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] bg-black">
					<DialogHeader>
						<DialogTitle>Sign In</DialogTitle>
						<DialogDescription>
							Enter your email to sign up, a link will be sent to log you in.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleSignUp}>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="email" className="text-right">
									Email
								</Label>
								<Input id="email" placeholder="john@appleseeds.com" className="text-gray-950 col-span-3" />
							</div>
							{/*<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="password" className="text-right">
									Password
								</Label>
								<Input id="password" type={typePassword ? "password" : "text"} placeholder="Password..." className="text-gray-950 col-span-3" />
								<div onClick={togglePasswordVisibility} className="z-[100] translate-x-[21.5rem] -translate-y-11">
									{typePassword ? (
										<Image alt="eyes" src={eyeImg} width={18} height={18} id="eyeImg" />
									) : (
										<Image alt="eyes" src={eyeSlashImg} width={18} height={18} id="eyeSlashImg" />
									)}
								</div>
							</div>*/}
						</div>
						<DialogFooter>
							<Button
								type="submit"
								disabled={isLoading}
								className={isLoginEmailSent ? 'text-green-500' : ''}
							>
								{isLoginEmailSent ? 'Email Sent!' : (isLoading ? 'Sending...' : 'Sign Up')}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	)
};
