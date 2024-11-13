import { db } from '@/app/utils/dbconnection';

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const group = await db.query('SELECT * FROM groups WHERE group_id = $1;', [id]);
    const members = await db.query(
      'SELECT u.username FROM users u JOIN player_group_junction gm ON u.username = gm.player WHERE gm.group_id = $1;',
      [id]
    );
    return new Response(JSON.stringify({ group: group.rows[0], members: members.rows }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export const POST = withAuth(async (req, { params }) => {
  const { clerk_id } = req.auth; // Assuming userId corresponds to username
  const { id } = params;
  try {
    const result = await db.query(
      'INSERT INTO player_group_junction (group_id, player) VALUES ($1, $2) RETURNING *;',
      [id, userId]
    );
    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});

export const DELETE = withAuth(async (req, { params }) => {
  const { userId } = req.auth; // Assuming userId corresponds to username
  const { id } = params;
  try {
    await db.query('DELETE FROM player_group_junction WHERE group_id = $1 AND player = $2;', [id, userId]);
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
