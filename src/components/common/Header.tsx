"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CircleGauge, LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { useRouter } from "next/navigation";
import Link from "next/link";

import Brand from "@ui/Brand";
import Button from "@ui/Button";
import { Avatar, AvatarFallback } from "@ui/Avatar";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@ui/Dropdown";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@ui/Dialog";

import { useSession } from "@contexts/SessionContext";

export type HeaderProps = {
  fixed?: boolean;
  border?: boolean;
};

export default function Header({fixed, border = true}: HeaderProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const {authenticated, username, role} = useSession() || {};
  const initial = useMemo(() => username?.charAt(0).toUpperCase(), [username]);

  useEffect(() => {
    if (fixed) return setScrolled(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fixed]);

  const onLogOut = useCallback(async () => {
    const {data, status} = await axios.get("/api/auth/logout");
    const {success, message = "Something went wrong, try again later"} = data;
    if (!success || status !== 200) return toast.error(message);

    // Refresh current page to remove session cookie
    router.refresh();
  }, [router]);

  return (
    <header className="header" id="header" data-scrolled={scrolled} data-border={border}>
      <Link className="header__brand" href="/">
        <Brand className="header__img" theme="light"/>
      </Link>
      {authenticated && (
        <Dialog>
          <Dropdown>
            <Avatar asChild>
              <DropdownTrigger>
                <AvatarFallback>
                  {initial}
                </AvatarFallback>
              </DropdownTrigger>
            </Avatar>
            <DropdownContent>
              <DropdownItem>
                My Account
              </DropdownItem>
              {role === "Admin" && (
                <DropdownItem>
                  <CircleGauge/> Dashboard
                </DropdownItem>
              )}
              <DialogTrigger asChild>
                <DropdownItem variant="destructive">
                  <LogOut/> Log out
                </DropdownItem>
              </DialogTrigger>
            </DropdownContent>
          </Dropdown>
          <DialogContent noClose>
            <DialogHeader>
              <DialogTitle>Logout</DialogTitle>
              <DialogDescription>Are you sure you want to log out?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={onLogOut}>Logout</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {!authenticated && (
        <Link className="header__login" href="/auth/login">
          <LogIn className="header__login-icon"/>
        </Link>
      )}
    </header>
  );
}
