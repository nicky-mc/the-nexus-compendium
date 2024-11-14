import { db } from '@/app/utils/dbconnection';
import { getAuth } from "@clerk/nextjs/server";

export async function DELETE(req, { params }) {
  const { userId } = getAuth(req);
  const { id } = params;
  try {
    await db.query('DELETE FROM player_group_junction WHERE group_id = $1 AND player = $2;', [id, userId]);
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}