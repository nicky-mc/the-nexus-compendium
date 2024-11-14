import { db } from '@/app/utils/dbconnection';
import { currentUser } from "@clerk/nextjs/server";

export async function PUT(req, { params }) {
  const { userId } = getAuth(req);
  const { id } = params;
  try {
    const result = await db.query(
      'INSERT INTO player_group_junction (group_id, player) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *;',
      [id, userId]
    );
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: "User already in group" }), { status: 200 });
    }
    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}