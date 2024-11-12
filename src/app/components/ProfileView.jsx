'use client';

export default function ProfileView({ user }) {
  if (!user) {
    return <p>No profile data available. Create your profile to get started!</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Profile Details</h2>
      {/* Render other user-specific details here if applicable */}
      <p><strong>Email:</strong> {user.email || "Not provided"}</p>
      {/* Any additional profile information */}
    </div>
  );
}
