import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/utils/dbconnection";
import React from "react";
import ProfileForm from "@/app/components/ProfileForm";
import ProfileView from "@/app/components/ProfileView";
import Link from "next/link";

export default async function ProfilePage({ searchParams }) {
  const { userId } = await auth();

  const userResult = await db.query(
    `SELECT * FROM users WHERE clerk_id = $1`,
    [userId]
  );

  const user = userResult.rows?.[0] || null;
  const isEditing = searchParams?.edit === "true";

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 shadow rounded-lg">
      <h1 className="text-center text-2xl font-bold">
        {user ? "Your Profile" : "Create your profile for others to see"}
      </h1>

      {isEditing ? (
        <ProfileForm user={user} userId={userId} />
      ) : (
        <ProfileView user={user} />
      )}

      <div className="mt-4 flex justify-center">
        {isEditing ? (
          <Link href="?edit=false">
            <button className="btn btn-outline btn-error">Cancel</button>
          </Link>
        ) : (
          <Link href="?edit=true">
            <button className="btn btn-primary">
              {user ? "Edit Profile" : "Create Profile"}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
