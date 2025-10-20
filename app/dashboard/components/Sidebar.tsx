'use client'

import { Button } from "@mui/material";
import Link from "next/link";

export default function Sidebar ({className} : {className:string}) {
    return (
        <div className="w-48 bg-gray-200 h-screen rounded-r-2xl px-6 py-6 flex flex-col gap-3">
            <Link href={'/'} className='text-2xl font-bold text-red-600 px-2'>
                clonebnb
            </Link>
            <Link href={'/dashboard/account'}>
                <Button sx={{justifyContent: 'flex-start', width: '100%'}}>Account</Button>
            </Link>
            <Link href={'/dashboard/create'}>
                <Button sx={{justifyContent: 'flex-start', width: '100%'}}>Create</Button>
            </Link>
            <Link href={'/dashboard/services'}>
                <Button sx={{justifyContent: 'flex-start', width: '100%'}}>Services</Button>
            </Link>
        </div>
    )
}