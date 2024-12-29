"use client";
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

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { useEffect, useState } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    if (typeof window !== 'undefined') {
        let navElement = document.getElementById("main-nav");
        if (navElement !== null) {
            if (isScrolled) {
                navElement.classList.add("border-b border-gray-300");
            } else {
                navElement.classList.remove("border-b border-gray-300");
            }
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Set initial state on mount

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (

        <nav className={`fixed top-0 left-0 w-full bg-black transition-[box-shadow] duration-700 ease-out ${isScrolled ? 'shadow-lg shadow-gray-900/70' : 'ease-in duration-300'
            }`}>
            <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/*<!-- Logo (Left) -->*/}
                    <div className="flex-1">
                        <a href="/" className="text-2xl font-bold underline underline-offset-4">Automeet</a>
                    </div>

                    <div className="flex flex-1 justify-end items-center md:hidden">
                        <Drawer>
                            <DrawerTrigger><i className="fa-solid fa-hamburger text-gray-300 align-middle text-2xl p-1 active:text-gray-300/70"></i></DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle className="pl-5 text-3xl text-left">Automeet</DrawerTitle>
                                    {/*<DrawerDescription></DrawerDescription>*/}
                                </DrawerHeader>
                                <DrawerFooter className="text-xl p-4 mx-5">
                                    <a href="/about">About</a>
                                    <a>Pricing</a>
                                    <a>Your Data</a>
                                    <DrawerClose className="pt-5">
                                        <div className="pt-5 pb-5 text-base space-x-3 flex justify-center">
                                            <a className="border text-center bg-gray-300 text-gray-950 w-24 px-2 py-1 rounded-md">Sign In</a>
                                            <a className="border text-center w-24 px-2 py-1 rounded-md">Sign Up</a>
                                        </div>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>

                    {/*<!-- Centered Links -->*/}
                    <div className="hidden md:flex justify-center gap-8">
                        <a href="/about" className="hover:text-blue-600">About</a>
                        <a href="/pricing" className=" hover:text-blue-600">Pricing</a>
                        <a href="/data" className=" hover:text-blue-600">Your Data</a>
                    </div>

                    {/*<!-- Sign In / Sign Up (Right) -->*/}
                    <div className="hidden flex-1 md:flex justify-end items-center gap-4">
                        {/*<button onClick={handleOpenModal} className="hover:text-blue-600">Sign In</button > */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="px-4 py-2 hover:text-blue-600">Sign In</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-black">
                                <DialogHeader>
                                    <DialogTitle>Sign In</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Username
                                        </Label>
                                        <Input id="username" value="@peduarte" className="col-span-3" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="secondary" className="bg-blue-600">Sign Up</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-black">
                                <DialogHeader>
                                    <DialogTitle>Sign In</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Username
                                        </Label>
                                        <Input id="username" value="@peduarte" className="col-span-3" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                </div>
            </div >
        </nav >

    )
}