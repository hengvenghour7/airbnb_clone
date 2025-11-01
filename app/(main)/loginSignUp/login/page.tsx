'use client'

import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Alert, Button, FormControl, FormHelperText, MenuItem, Snackbar, SnackbarOrigin } from '@mui/material';
import { userLoginType } from '@/app/lib/databaseType';
import CheckIcon from '@mui/icons-material/Check';
// import router from 'next/router';
interface State extends SnackbarOrigin {
  open: boolean;
}

export default function Login () {
    // const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [state, setState] = useState<State>({
            open: false,
            vertical: 'top',
            horizontal: 'right',
        });
    const { vertical, horizontal, open } = state;
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
        setState({...state, open: true});
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
        if (json.data.success) {
            Object.entries(json.data.user).forEach(([key, data]) => {
                localStorage.setItem(key, String(data));
            })
            localStorage.setItem('isAuth', 'true')
            window.location.href = '/dashboard/account'
        } 
        else {
            setIsFormError(true);
        }
    }
    const handleClose = () => {
        setState({...state, open: false});
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
                        type= {item.fieldName.includes('password') ? 'password' : 'text'}
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
            {/* <Alert severity="info">This is an info Alert.</Alert> */}
            <Snackbar
                anchorOrigin={{ horizontal, vertical }}
                open={open}
                onClose={handleClose}
                // message="I love snacks"
                // key={vertical + horizontal}
            >
                <Alert
                severity="info"
                variant="filled"
                sx={{ width: '100%' }}
                >
                    Login in Progess
                </Alert>
            </Snackbar>
        </div>
    )
}