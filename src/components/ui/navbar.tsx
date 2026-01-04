"use client";

import Image from "next/image";
import Link from "next/link";
import DashboardLogoutButton from "../../app/dashboard/dashboardLogoutButton";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  //DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Button } from "@/components/ui/button"

import hamburgerIcon from "@/public/icons8-hamburger-menu-50.png";

import { useEffect, useState } from "react";
import AuthButtons from "./authButtons";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(prev => (prev === scrolled ? prev : scrolled));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (

    <nav className={`fixed top-0 left-0 w-full bg-black/0 transition-[box-shadow] duration-700 ease-out ${isScrolled ? 'shadow-lg shadow-gray-900/70 bg-black/100 opacity-100 z-50' : 'ease-in duration-300'}`}>
      <div className="max-w-[96rem] mx-auto px-8 py-2">
        <div className="flex items-center justify-between h-16">
          {/*<!-- Logo (Left) -->*/}
          <div className="flex-1">
            <Link href="/" className="text-2xl font-bold underline underline-offset-4">Automeet</Link>
          </div>

          <div className="flex flex-1 justify-end items-center min-[1000px]:hidden">
            <Drawer>
              <DrawerTrigger>
                <Image alt='menu' src={hamburgerIcon} width={36} height={36}></Image>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="pl-5 text-3xl text-left">Automeet</DrawerTitle>
                  {/*<DrawerDescription></DrawerDescription>*/}
                </DrawerHeader>
                <DrawerFooter className="text-xl p-4 mx-5">
                  <Link href="/about">About</Link>
                  <Link href="/pricing">Pricing</Link>
                  <Link href="/data">Your Data</Link>
                  <DrawerClose className="pt-5">
                    {loading ? null :
                      user ? (
                        <div className="pt-5 pb-5 text-base space-x-3 flex justify-center">
                          <Link className="border bg-gray-300 text-base text-gray-950 px-3 py-2 rounded-md" href="/dashboard">Dashboard</Link>
                          <DashboardLogoutButton />
                        </div>
                      ) : (
                        <div className="pt-5 pb-5 text-base space-x-3 flex justify-center">
                          <Link className="border text-center bg-gray-300 text-gray-950 w-24 px-2 py-1 rounded-md" href="/sign-in">Sign In</Link>
                          <Link className="border text-center w-24 px-2 py-1 rounded-md" href="/sign-in">Sign Up</Link>
                        </div>
                      )}
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          {/*<!-- Centered Links -->*/}
          <div className="hidden min-[1000px]:flex justify-center gap-8">
            <Link href="/about" className="hover:text-blue-600">About</Link>
            <Link href="/pricing" className=" hover:text-blue-600">Pricing</Link>
            <Link href="/data" className=" hover:text-blue-600">Your Data</Link>
          </div>

          {/*<!-- Sign In / Sign Up (Right) -->*/}
          <div className="hidden flex-1 min-[1000px]:flex justify-end items-center">
            {!loading &&
              user ? (
              <div className="pt-5 pb-5 text-base space-x-3 flex justify-center">
                <Link role="button" className="btn" href="/dashboard">Dashboard</Link>
                <Button variant="outline" className="w-24 hover:bg-gray-200 hover:text-black" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <AuthButtons />
            )}
          </div>


        </div>
      </div >
    </nav >

  )
}
