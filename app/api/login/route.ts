import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { userLoginType } from '@/app/lib/databaseType';
import { userLogin } from '@/app/lib/databaseHelper';

export async function POST(req: Request) {
    try {
            const data: userLoginType = await req.json();
            const result = await userLogin(data)
            return NextResponse.json({ success: true, data: result });
        } catch (err) {
            console.error('Signup error:', err);
            return NextResponse.json({ success: false, error: err }, { status: 500 });
        }
}