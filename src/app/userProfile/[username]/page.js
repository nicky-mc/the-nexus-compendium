import { db } from "@/app/utils/dbconnection";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import * as React from "react";
import { redirect } from "next/navigation";
// TODO Update form to only update bio, or any other features that we want to add.
// TODO Update the db, where clerk_id = user.id.
// TODO Update the values to what the user has in the form.

export default async function editProfilePage() {
  const { userId } = await auth();

  const userResult = await db.query(
    `SELECT * FROM users WHERE clerk_user_id = $1`,
    [userId]
  );

  console.log("Fetched user result:", userResult.rows);

  const user = userResult.rows?.[0] || null;

  if (!user) {
    console.error("User not found.");
  }

  async function updateProfile(formValues) {
    "use server";
    const updatedData = {
      name: formValues.get("name"),
      username: formValues.get("username"),
      user_bio: formValues.get("user_bio"),
      user_email: formValues.get("user_email"),
      profile_picture_url: formValues.get("profile_picture_url"),
    };

    try {
      await db.query(
        `UPDATE users
         SET name = $2, username = $3, user_bio = $4, user_email $5, profile_picture_url = $6
         WHERE clerk_user_id = $1`,
        [
          updatedData.name,
          updatedData.username,
          updatedData.user_bio,
          updateData.user_email,
          updatedData.profile_picture_url,
          userId,
        ]
      );
      revalidatePath(`/user/${userId}`);
      redirect(`/user/${userId}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  return (
    <div>
      <h1>Edit Profile Page</h1>
      <div className="formContainer">
        <div>
          <form action={updateProfile} className="space-y-4">
            <div className="form-spacing">
              <label htmlFor="name">Name:</label>
              <textarea
                type="text"
                name="name"
                id="name"
                defaultValue={user?.name || ""}
                required
              />
            </div>
            <div className="form-spacing">
              <label htmlFor="username">Username:</label>
              <textarea
                type="text"
                name="username"
                id="username"
                defaultValue={user?.username || ""}
                required
              />
            </div>

            <div className="form-spacing">
              <label htmlFor="bio">Bio:</label>
              <textarea
                name="user_bio"
                id="_user_bio"
                defaultValue={user?.user_bio || ""}
                required
              />
            </div>

            <div className="form-spacing">
              <label htmlFor="user_email">Email:</label>
              <textarea
                name="user_email"
                id="_user_email"
                defaultValue={user?.user_email || ""}
                required
              />
            </div>

            <div className="form-spacing">
              <label htmlFor="profile_picture_url">Profile Picture Url:</label>
              <textarea
                type="text"
                name="profile_picture_url"
                id="profile_picture_url"
                defaultValue={user?.profile_picture_url || ""}
              />
            </div>
            <button className="submit" type="submit">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
