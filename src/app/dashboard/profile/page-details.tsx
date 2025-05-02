"use client";

import TimeAgo from "react-timeago";

export type DashboardProfileDetailsProps = {
  username: string;
  role: string;
  createdAt: string;
};

export default function DashboardProfileDetails({ username, role, createdAt }: DashboardProfileDetailsProps) {
  return (
    <div className="profile__details">
      <div className="profile__detail">
        <span className="profile__detail-label">
          <span>Username</span><span>:</span>
        </span>
        <span className="profile__detail-value">
          {username}
        </span>
      </div>
      <div className="profile__detail">
        <span className="profile__detail-label">
          <span>Role</span><span>:</span>
        </span>
        <span className="profile__detail-value">
          {role}
        </span>
      </div>
      <div className="profile__detail">
        <span className="profile__detail-label">
          <span>Joined at</span><span>:</span>
        </span>
        <span className="profile__detail-value">
          <TimeAgo date={createdAt}/>
        </span>
      </div>
    </div>
  );
}
