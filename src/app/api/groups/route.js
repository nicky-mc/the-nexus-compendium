import { db } from '@/app/utils/dbConnection';

export async function GET() {
  try {
    const result = await db.query('SELECT * FROM groups;');
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { group_name, description, dm } = await req.json();
    const result = await db.query(
      'INSERT INTO groups (group_name, description, dm) VALUES ($1, $2, $3) RETURNING *;',
      [group_name, description, dm]
    );
    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
