import { db } from "@/app/utils/dbconnection";
import { auth } from "@clerk/nextjs/server";

export async function GET(req) {
  const { userId } = await auth();
  try {
    const result = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId]);
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

export async function POST(req) {
  const { userId } = await auth();
  const { username, bio, profile_picture_url } = await req.json();
  try {
    await db.query(
      `INSERT INTO users (username, user_bio, profile_picture_url, clerk_id)
      VALUES ($1, $2, $3, $4)`,
      [username, bio, profile_picture_url, userId]
    );
    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

export async function PUT(req) {
  const { userId } = await auth();
  const { username, user_bio, profile_picture_url } = await req.json();
  try {
    await db.query(
      `UPDATE users
       SET username = $1, user_bio = $2, profile_picture_url = $3
       WHERE clerk_id = $4`,
      [username, user_bio, profile_picture_url, userId]
    );
    return new Response(JSON.stringify({ message: 'User updated successfully' }), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

export async function DELETE(req) {
  const { userId } = await auth();
  try {
    await db.query(`DELETE FROM users WHERE clerk_id = $1`, [userId]);
    return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}