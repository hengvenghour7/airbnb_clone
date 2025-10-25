import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { userLoginType } from '@/app/lib/databaseType';
import { getAvailableServices, userLogin } from '@/app/lib/databaseHelper';

export async function GET(request: Request) {
    try {
                const { searchParams } = new URL(request.url);
                const serviceType = searchParams.get("servicetype") || 'all';
                const hostname = searchParams.get("hostname") || '';
                const result = await getAvailableServices(serviceType, hostname)
                return NextResponse.json({ success: true, data: result });
            } catch (err) {
                console.error('Signup error:', err);
                return NextResponse.json({ success: false, error: err }, { status: 500 });
            }
}