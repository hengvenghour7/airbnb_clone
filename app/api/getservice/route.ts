import { NextResponse } from 'next/server';
import { getServiceDetail } from '@/app/lib/databaseHelper';

export async function GET(request: Request) {
    try {
                const { searchParams } = new URL(request.url);
                const placename = searchParams.get("placename") || '';
                const result = await getServiceDetail(placename)
                return NextResponse.json({ success: true, data: result });
            } catch (err) {
                console.error('Signup error:', err);
                return NextResponse.json({ success: false, error: err }, { status: 500 });
            }
}