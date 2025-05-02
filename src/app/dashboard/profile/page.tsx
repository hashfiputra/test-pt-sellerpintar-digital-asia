import Link from "next/link";
import { authProfile } from "@lib/auth";

import { Button } from "@ui/Button";
import { Avatar, AvatarFallback } from "@ui/Avatar";

import DashboardProfileDetails from "./page-details";

export default async function DashboardProfile() {
  const { username, role, createdAt } = await authProfile();
  const initial = username.charAt(0).toUpperCase();

  return (
    <main id="skip">
      <section className="section" id="profile">
        <div className="profile__container">
          <h1 className="profile__title">User Profile</h1>
          <div className="profile__content">
            <Avatar className="profile__avatar">
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
            <DashboardProfileDetails
              username={username}
              role={role}
              createdAt={createdAt}
            />
          </div>
          <Button className="profile__back" full asChild>
            <Link href="/dashboard/articles">Back to dashboard</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
