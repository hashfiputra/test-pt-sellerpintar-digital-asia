import ProfileDetails from "./page-details";
import Link from "next/link";

import Header from "@common/Header";
import Footer from "@common/Footer";

import { Button } from "@ui/Button";
import { Avatar, AvatarFallback } from "@ui/Avatar";

import { authProfile } from "@lib/auth";

export default async function Profile() {
  const { username, role, createdAt } = await authProfile();
  const initial = username.charAt(0).toUpperCase();

  return (
    <>
      <Header fixed={true}/>
      <main className="profile" id="skip">
        <div className="profile__container">
          <h1 className="profile__title">User Profile</h1>
          <div className="profile__content">
            <Avatar className="profile__avatar">
              <AvatarFallback>
                {initial}
              </AvatarFallback>
            </Avatar>
            <ProfileDetails username={username} role={role} createdAt={createdAt}/>
          </div>
          <Button className="profile__back" full asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </main>
      <Footer/>
    </>
  );
}
