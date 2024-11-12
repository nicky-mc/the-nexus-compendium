import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import * as React from "react";
import { redirect } from "next/navigation";

export default async function createProfilePage() {
  const { userId } = await auth();

  async function createProfile(formValues) {
    "use server";
    const formData = {
      username: formValues.get("username"),
      bio: formValues.get("user_bio"),
      profile_picture_url: formValues.get("profile_picture_url"),
      clerk_user_id: userId,
    };
    console.log(formData);

    try {
      await db.query(
        `INSERT INTO users (user_name, user_bio, profile_picture_url, clerk_user_id)
        VALUES ($3, $4, $6)`,
        [
          formData.user_name,  
          formData.user_bio,
          formData.profile_picture_url,
          formData.clerk_user_id,
        ]
      );

      revalidatePath(`/user/${userId}`);
      redirect(`/user/${userId}`);
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  }

  return (
    <div>
      <div className="formContainer">
        <div>
          <h1 className="text-center text-xl font-bold">
            Create your profile for others to see
          </h1>

            <div className="form-spacing">
              <label htmlFor="username">Username:</label>
              <textarea type="text" name="username" id="username" required />
            </div>

            <div className="form-spacing">
              <label htmlFor="user_bio">Bio:</label>
              <textarea name="your_bio" id="your_bio" required />
            </div>

            <div className="form-spacing">
              <label htmlFor="profile_picture_url">Profile Picture Url:</label>
              <textarea
                type="text"
                name="profile_picture_url"
                id="profile_picture_url"
                // required
              />
            </div>
            <button className="createButton" type="submit">
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}