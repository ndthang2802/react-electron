import React, { useState ,useRef } from 'react';
import {Box,Input,InputLabel,FormControl, Button } from '@material-ui/core'
import AuthApiCall from '../apiCall/auth.api'

export default function LoginPage(props){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const {setToken} = props
    const formRef = useRef()

    const onChanging = (e) => {
        setError('');
        if (e.target.id === 'username') setUsername(e.target.value)
        else setPassword(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        formRef.current.reset();
        let response = await AuthApiCall.getToken({username,password})
        if (response.status === 200){
            response = await response.json()
            setToken(response['access_token'])
        }
        else if (response.status === 403){
            setError('Invalid username or password')
        }

    }

    return (
        <Box  width={1} minHeight='100vh' >
            <Box  position={'absolute'} top={'28%'} left={'20%'} width={'30%'} px={4}  >
                <Box display='flex' flexDirection='column' boxShadow={8} p={2}>
                    <Box textAlign='center' width='60%' >
                        Login to system
                    </Box>
                    <form onSubmit={handleSubmit} ref={formRef} >
                        <Box px={2} width='60%' mt={2}>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="username" >Username</InputLabel>
                                <Input id="username" fullWidth={true} onChange={onChanging}  />
                            </FormControl>
                        </Box>
                        <Box px={2} width='60%' mt={2} >
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="password">password</InputLabel>
                                <Input id="password" fullWidth={true} onChange={onChanging} type='password' />
                            </FormControl>
                        </Box>
                        <Box mt={2} width='65%' display='flex' flexDirection='row' justifyContent='flex-end'>
                            <Button variant="outlined" color="primary" type='submit'>
                                Sign in
                            </Button>
                        </Box>
                        { error ?
                            <Box px={2} width='60%' mt={2} color="secondary.main" >
                                {error}
                            </Box>
                         : null
                        }
                    </form>
                </Box>
            </Box>
        </Box>
    )
}