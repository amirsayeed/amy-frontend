"use client"
import React, { useState, useEffect } from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn, verifySession} from "@/lib/utils";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { LoginForm } from './LoginForm';


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
          const res = await verifySession();
          if (res.valid) setLoggedIn(true);
        };
        checkLogin();
      }, []);
    
      const handleLogout = () => {
        sessionStorage.removeItem("authid"); 
        setLoggedIn(false);                  
        alert("Logged out successfully!");
      };

    return (
        <div className='shadow-md'>
            <div className='max-w-6xl mx-auto flex items-center justify-between py-3 px-4 md:px-8 lg:px-12'>
                <div>
                    <Image src="/images/logo.png" height={70} width={70} alt='logo of the website' />
                </div>

                <div className='flex gap-1 items-center'>
                    <NavigationMenu>
                        <NavigationMenuList className="flex space-x-1">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-base font-medium")}>
                                    <Link href="/flights">Flights</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-base font-medium")}>
                                    <Link href="/hotels">Hotels</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-base font-medium")}>
                                    <Link href="/visa">Visa</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-base font-medium")}>
                                    <Link href="/umrah">Umrah</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-base font-medium")}>
                                    <Link href="/explore">Explore</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-base font-medium")}>
                                    <Link href="/mobile-app">App</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {loggedIn ? (
                        <Button
                        className="ml-4 bg-[#001ea0] text-white"
                        onClick={handleLogout}
                      >
                        Logged in 
                      </Button>
                    ) : (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="bg-[#001ea0] text-base text-white ml-4">
                                    Login | Create
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md bg-white">
                                <DialogTitle>Login</DialogTitle>
                                <LoginForm setOpen={setOpen} setLoggedIn={setLoggedIn} />
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
