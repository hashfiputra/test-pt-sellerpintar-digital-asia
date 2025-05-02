"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleGauge, Loader2, LogIn, LogOut } from "lucide-react";
import { useIsMounted } from "usehooks-ts";
import Link from "next/link";

import { useLogout } from "@hooks/useLogout";
import { useSession } from "@contexts/SessionContext";

import Brand from "@ui/Brand";
import { Button } from "@ui/Button";
import { Avatar, AvatarFallback } from "@ui/Avatar";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@ui/Dropdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@ui/Dialog";

export type HeaderProps = {
  fixed?: boolean;
  border?: boolean;
};

export default function Header({ fixed, border = true }: HeaderProps) {
  const mounted = useIsMounted();
  const { loading, logout } = useLogout();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { authenticated, username, role } = useSession() || {};
  const initial = useMemo(() => username?.charAt(0).toUpperCase(), [username]);

  useEffect(() => {
    if (fixed) return setScrolled(true);
    if (!mounted()) setScrolled(window.scrollY > 10);

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fixed, mounted]);

  return (
    <header className="header" id="header" data-scrolled={scrolled} data-border={border}>
      <Link className="header__brand" href="/">
        <Brand className="header__img" theme={scrolled ? "light" : "dark"}/>
      </Link>
      {authenticated && (
        <Dialog open={open} onOpenChange={(open) => setOpen(!loading ? open : true)}>
          <Dropdown modal={false}>
            <div className="header__profile">
              <Avatar asChild>
                <DropdownTrigger>
                  <AvatarFallback>
                    {initial}
                  </AvatarFallback>
                </DropdownTrigger>
              </Avatar>
              <DropdownTrigger>
                <span className="header__username">
                  {username}
                </span>
              </DropdownTrigger>
            </div>
            <DropdownContent align="end" sideOffset={20}>
              <DropdownItem asChild>
                <Link href="/auth/profile">My Account</Link>
              </DropdownItem>
              {role === "Admin" && (
                <DropdownItem asChild>
                  <Link href="/dashboard"><CircleGauge/> Dashboard</Link>
                </DropdownItem>
              )}
              <DropdownItem variant="destructive" onClick={() => setOpen(true)}>
                <LogOut/> Log out
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
          <DialogContent noClose>
            <DialogHeader>
              <DialogTitle>Logout</DialogTitle>
              <DialogDescription>Are you sure you want to log out?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={logout} disabled={loading}>
                {loading && <Loader2 className="animate-spin"/>}
                Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {!authenticated && (
        <div className="header__auth">
          <Link className="header__auth-visual" href="/auth/login">
            <LogIn className="header__auth-icon"/>
          </Link>
          <div className="header__auth-text">
            <Link className="header__auth-login" href="/auth/login">
              Login
            </Link>
            <span> / </span>
            <Link className="header__auth-register" href="/auth/register">
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
