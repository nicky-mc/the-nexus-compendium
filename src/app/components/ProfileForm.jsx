'use client';
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfileForm({ user, userId }) {
  const router = useRouter();

  async function saveProfile(formData) {
    const updatedData = {
      username: formData.get("username"),
      user_bio: formData.get("user_bio"),
      profile_picture_url: formData.get("profile_picture_url"),
    };

    try {
      const method = user ? 'PUT' : 'POST';
      const response = await fetch('/api/user', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        router.push(`/user/${userId}`);
      } else {
        const errorData = await response.json();
        console.error(`Error ${user ? 'updating' : 'creating'} profile:`, errorData);
      }
    } catch (error) {
      console.error(`Error ${user ? 'updating' : 'creating'} profile:`, error);
    }
  }

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      await saveProfile(formData);
    }}>
      <div className="form-spacing">
        <label htmlFor="username">Username:</label>
        <textarea
          name="username"
          id="username"
          defaultValue={user?.username || ""}
          required
        />
      </div>

      <div className="form-spacing">
        <label htmlFor="user_bio">Bio:</label>
        <textarea
          name="user_bio"
          id="user_bio"
          defaultValue={user?.user_bio || ""}
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
      <button className="createButton" type="submit">
        {user ? 'Update Profile' : 'Create Profile'}
      </button>
    </form>
  );
}