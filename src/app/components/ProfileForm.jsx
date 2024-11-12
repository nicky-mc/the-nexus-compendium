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
        // Redirect to profile view page with edit=false after successful save
        router.push(`/userProfile/${updatedData.username}?edit=false`);
      } else {
        const errorData = await response.json();
        console.error(`Error ${user ? 'updating' : 'creating'} profile:`, errorData);
      }
    } catch (error) {
      console.error(`Error ${user ? 'updating' : 'creating'} profile:`, error);
    }
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await saveProfile(formData);
      }}
      className="space-y-4"
    >
      <div className="form-control">
        <label htmlFor="username" className="label">
          <span className="label-text">Username:</span>
        </label>
        <textarea
          name="username"
          id="username"
          className="textarea textarea-bordered"
          defaultValue={user?.username || ""}
          required
        />
      </div>

      <div className="form-control">
        <label htmlFor="user_bio" className="label">
          <span className="label-text">Bio:</span>
        </label>
        <textarea
          name="user_bio"
          id="user_bio"
          className="textarea textarea-bordered"
          defaultValue={user?.user_bio || ""}
          required
        />
      </div>

      <div className="form-control">
        <label htmlFor="profile_picture_url" className="label">
          <span className="label-text">Profile Picture URL:</span>
        </label>
        <textarea
          name="profile_picture_url"
          id="profile_picture_url"
          className="textarea textarea-bordered"
          defaultValue={user?.profile_picture_url || ""}
        />
      </div>

      <div className="form-control mt-4">
        <button className="btn btn-success w-full" type="submit">
          {user ? 'Update Profile' : 'Create Profile'}
        </button>
      </div>
    </form>
  );
}
