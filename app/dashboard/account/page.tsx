'use client'

import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Account () {
    type UserType = {
        username: string | null,
        serviceType: string | null,
    }
    const [user, setUser] = useState<UserType>(
        {
            username: '',
            serviceType: ''
        });
    const [userData, setUserData] = useState(
        {
            accountName: {
                fieldname: 'Account name',
                value: 'Venghour'
            },
            phoneNumber: {
                fieldname: 'Phone number',
                value: '0965777'
            },
            serviceType: {
                fieldname: 'Service type',
                value: 'Accomodation'
            },
            email: {
                fieldname: 'email',
                value: 'vv@gmail.com'
            },
        }
    )
    useEffect(() => {
        setUser({
            username: localStorage.getItem('username'),
            serviceType: localStorage.getItem('servicetype')
        })
        setUserData(prev => (
            {
                ...prev, accountName: {
                    fieldname: 'Account Name',
                    value: localStorage.getItem('username') || ''
                },
                phoneNumber: {
                    fieldname: 'Phone number',
                    value: localStorage.getItem('telephone') || ''
                },
                serviceType: {
                    fieldname: 'Service type',
                    value: localStorage.getItem('servicetype') || ''
                },
                email: {
                    fieldname: 'email',
                    value: localStorage.getItem('email') || ''
                }
            }
        ))
    }, [])
    return (
        <div className="m-12 w-full">
            <h3 className="mb-4 text-blue-600 font-semibold">Account</h3>
            {
                Object.entries(userData).map(([key, user]) => (
                    <div key={`account_${key}`} className="grid grid-cols-2 mb-3">
                        <p className="font-semibold">{user.fieldname}</p>
                        <p>{user.value}</p>
                    </div>
                ))
            }
            <Link href={'/dashboard/services'}>
                <Button variant="contained">Check all services</Button>
            </Link>
        </div>
    )
}