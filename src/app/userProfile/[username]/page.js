import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/utils/dbconnection";
import React from "react";
import ProfileForm from "@/app/components/ProfileForm";

export default async function ProfilePage() {
  const { userId } = await auth();

  const userResult = await db.query(
    `SELECT * FROM users WHERE clerk_id = $1`,
    [userId]
  );

  const user = userResult.rows?.[0] || null;

  return (
    <div>
      <div className="formContainer">
        <div>
          <h1 className="text-center text-xl font-bold">
            {user ? 'Update your profile' : 'Create your profile for others to see'}
          </h1>
          <ProfileForm user={user} userId={userId} />
        </div>
      </div>
    </div>
  );
}