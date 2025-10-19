'use client'

import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Button, FormControl, FormHelperText, MenuItem } from '@mui/material';
import {serviceDataType, userSignUpType} from '@/app/lib/databaseType';

export default function SignUp () {
    const [allSignUpInput, setAllSignUpInput] = useState([
        {
            fieldName: 'username',
            value: '',
            required: true,
            isError: false,
            helperText: 'required'
        },
        {
            fieldName: 'password',
            value: '',
            required: true,
            isError: false,
            helperText: 'required'
        },
        {
            fieldName: 'confirm password',
            value: '',
            required: true,
            isError: false,
            helperText: 'required'
        },
        {
            fieldName: 'service type',
            value: '',
            required: true,
            isError: false,
            helperText: 'required'
        },
        {
            fieldName: 'email',
            value: '',
            required: true,
            isError: false,
            helperText: 'required'
        },
        {
            fieldName: 'telephone',
            value: '',
            required: true,
            isError: false,
            helperText: 'required'
        }
    ])
    const [isSubmit, setIsSubmit] = useState(false);
    const handleFormChange = (index:number, newValue: string) => {
        setAllSignUpInput((prev) => prev.map((field, i) => {
                if (field.fieldName == 'confirm password') {
                    return i == index ? {
                        ...field ,
                        value: newValue, 
                        helperText: newValue !== allSignUpInput[1].value && newValue.length > 0 ? 'password not matched' : 'required', 
                        isError: newValue !== allSignUpInput[1].value && newValue.length > 0
                    } : field
                }
                return i == index ? {...field , value: newValue} : field
            }))
    };
    const submitForm = async () => {
        let canBeSubmit = true;
        setIsSubmit(true);
        const userForm: userSignUpType = {
            username: allSignUpInput[0].value,
            password: allSignUpInput[1].value,
            serviceType: allSignUpInput[3].value,
            email: allSignUpInput[4].value,
            telephone: allSignUpInput[5].value
        }
        allSignUpInput.forEach(item => {
            if (item.value === '') {
                canBeSubmit = false;
                console.log("form can't submit yet");
                return;
            }
        })
        // if (canBeSubmit) userSignUp(userForm);
        if (canBeSubmit) {
            const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userForm),
        });

        const result = await res.json();
        console.log(result);
        }
    }
    return (
        <div className='py-12 flex justify-center'>
            <div className='w-128'>
                <h3 className='text-center font-bold'>Sign Up</h3>
                <FormControl sx={{width: '100%'}}>
                {
                    allSignUpInput.map((item, index) => (
                        <TextField
                        sx={{
                            marginTop: '16px',
                        }}
                        key= {`signUp_${index}`}
                        onChange={(e) => handleFormChange(index, e.target.value)}
                        label= {item.fieldName}
                        error= {(item.value.length <= 0 || (item.fieldName === 'confirm password' && item.isError)) && item.required && isSubmit}
                        value= {item.value}
                        helperText= {(item.value.length <= 0 || (item.fieldName === 'confirm password' && item.isError)) && item.required && isSubmit ? item.helperText : ''}
                        />
                    ))
                }
                </FormControl>
                <div className='text-center mt-8'>
                    <Button onClick={submitForm} variant='contained' color='info'>Submit</Button>
                </div>
            </div>
        </div>
    )
}