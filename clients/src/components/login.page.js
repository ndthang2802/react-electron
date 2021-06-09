import React, { useState } from 'react';

import {Box,Input,InputLabel,FormControl , Grid, Button } from '@material-ui/core'

export default function Login_Page(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const onChanging = (e) => {
        if (e.target.id === 'username') setUsername(e.target.value)
        else setPassword(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await fetch('http://127.0.0.1:8000/api/authentication/',{   // server_test
            method : 'POST',
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: JSON.stringify({username,password})
        }).then(res=>res.json())
        
        console.log(token)
    }
    return (
        <Box  width={1} minHeight='100vh' >
            <Box  position={'absolute'} top={'28%'} left={'20%'} width={'40%'} px={4}  >
                <Box display='flex' flexDirection='column' boxShadow={8} p={2}>
                    <Box >
                        Login to system
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Box px={2} width='60%' mt={2}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="username" >Username</InputLabel>
                                <Input id="username" fullWidth={true} onChange={onChanging} />
                            </FormControl>
                        </Box>
                        <Box px={2} width='60%' mt={2} >
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="password">password</InputLabel>
                                <Input id="password" fullWidth={true} onChange={onChanging} />
                            </FormControl>
                        </Box>
                        <Box mt={2} width='65%' display='flex' flexDirection='row' justifyContent='flex-end'>
                            <Button variant="outlined" color="primary" type='submit'>
                                Sign in
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}