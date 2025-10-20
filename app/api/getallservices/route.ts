import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { userLoginType } from '@/app/lib/databaseType';
import { getAllServices, userLogin } from '@/app/lib/databaseHelper';

export async function GET() {
    try {
                const result = await getAllServices()
                return NextResponse.json({ success: true, data: result });
            } catch (err) {
                console.error('Signup error:', err);
                return NextResponse.json({ success: false, error: err }, { status: 500 });
            }
}