import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { userSignUpType } from '@/app/lib/databaseType';
import { userSignUp } from '@/app/lib/databaseHelper'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(req: Request) {
    try {
        const data: userSignUpType = await req.json();
        const result = await userSignUp(data)
        return NextResponse.json({ success: true, data: result });
    } catch (err) {
        console.error('Signup error:', err);
        return NextResponse.json({ success: false, error: err }, { status: 500 });
    }
}
