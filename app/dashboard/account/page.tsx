'use client'

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
        })
    useEffect(() => {
        setUser({
            username: localStorage.getItem('username'),
            serviceType: localStorage.getItem('servicetype')
        }) 
    }, [])
    return (
        <div>
            <h3>Account</h3>
            <p>Username {user.username}</p>
            <p>Service {user.serviceType}</p>
        </div>
    )
}