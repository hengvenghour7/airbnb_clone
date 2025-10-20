'use client'

import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Button, FormControl, FormHelperText, MenuItem } from '@mui/material';
import { userLoginType } from '@/app/lib/databaseType';
// import router from 'next/router';


export default function Login () {
    const [allLoginInput, setAllLoginInput] = useState([
        {
            fieldName: 'username',
            value: '',
            required: true,
            isError: false,
            helperText: 'Incorrect Username'
        },
        {
            fieldName: 'password',
            value: '',
            required: true,
            isError: false,
            helperText: 'Incorrect Password'
        }
    ])
    const [isFormError, setIsFormError] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const handleFormChange = (index:number, newValue: string) => {
        setAllLoginInput((prev) => prev.map((field, i) => {
                return i == index ? {...field , value: newValue} : field
            }))
    };
    const submitLogin = async () => {
        const userForm: userLoginType = {
                    username: allLoginInput[0].value,
                    password: allLoginInput[1].value,
                }
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userForm),
        });
        const json = await res.json();
        // console.log('login res', json.data.success);
        if (json.data.success) {
            localStorage.setItem('username', json.data.user.username);
            localStorage.setItem('servicetype', json.data.user.servicetype);
            window.location.href = '/dashboard/account'
        } 
        else {
            setIsFormError(true);
        }
        
    }
    return (
        <div className='pt-12 flex justify-center'>
            <div className='w-128'>
                <h3 className='text-center font-bold'>Login</h3>
                <FormControl sx={{width: '100%'}}>
                {
                    allLoginInput.map((item, index) => (
                        <TextField
                        sx={{
                            marginTop: '16px',
                        }}
                        key= {`signUp_${index}`}
                        onChange={(e) => handleFormChange(index, e.target.value)}
                        label= {item.fieldName}
                        error= {isFormError}
                        value= {item.value}
                        helperText= {isFormError ? item.helperText : ''}
                        />
                    ))
                }
                </FormControl>
                <div className='text-center mt-8'>
                    <Button onClick={submitLogin} variant='contained' color='info'>Submit</Button>
                </div>
            </div>
        </div>
    )
}