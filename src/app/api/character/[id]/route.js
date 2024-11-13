import { NextResponse } from 'next/server';
import { db } from '@/app/utils/dbconnection';


export async function GET(req, { params }) {
    const { id } = params;

    try {
        const result = await db.query('SELECT * FROM characters WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return NextResponse.json({ message: 'Character not found' }, { status: 404 });
        }

        return NextResponse.json(result.rows[0], { status: 200 });
    } catch (error) {
        console.error('Error fetching character:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
