'use client'

import { Button } from "@mui/material";
import Link from "next/link";

const logout = () => {
    localStorage.setItem('isAuth', 'false');
    window.location.href = '/'
}
export default function Sidebar ({className} : {className?:string}) {
    return (
        <div className={`w-48 bg-gray-200 h-screen rounded-r-2xl px-6 py-6 flex flex-col justify-between ${className}`}>
            <div>
                <Link href={'/'}>
                    <h3 className='text-2xl font-bold text-red-600 px-2 mb-8'>
                        clonebnb
                    </h3>
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
            <div className="pb-8">
                <Button variant="contained" color="error" sx={{width: '100%'}} onClick={logout}>Logout</Button>
            </div>
        </div>
    )
}