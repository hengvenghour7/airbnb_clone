import { createNewService } from "@/app/lib/databaseHelper";
import { newServiceType } from "@/app/lib/databaseType";
import { NextResponse } from "next/server";


export async function POST (req: Request) {
    try {
        const data: newServiceType = await req.json();
        const result = await createNewService(data);
        return NextResponse.json({ success: true, data: result });
    } catch (err) {
        console.error('Signup error:', err);
        return NextResponse.json({ success: false, error: err }, { status: 500 });
    }
}