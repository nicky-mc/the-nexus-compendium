'use client';

export default function ProfileView({ user }) {
  if (!user) {
    return <p>No profile data available. Create your profile to get started!</p>;
  }

  return (
    <div className="space-y-4">
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Bio:</strong> {user.user_bio}</p>
      <p><strong>Profile Picture:</strong></p>
      {user.profile_picture_url ? (
        <img
          src={user.profile_picture_url}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full"
        />
      ) : (
        <p>No profile picture set.</p>
      )}
    </div>
  );
}
