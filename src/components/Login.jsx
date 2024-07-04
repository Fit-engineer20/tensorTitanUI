import React from 'react'
import { Stack, Avatar, Typography, TextField, Button } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';

const Login = ({toggle}) => {

    const { register , handleSubmit, formState: { errors, isLoading } } = useForm();

    const onSubmit = (formValues) => {
        console.log(formValues);
    }

  return (
    <Stack direction='column' sx={{padding:'20px', height:'calc(100% - 40px)' }} justifyContent='center' alignItems='center' spacing={3}>
        <Stack spacing={1} sx={{width:'100%', justifyContent:'center', alignItems:'center'}}>
            <Avatar sx={{backgroundColor:'#f50057'}}>
                <LockOutlinedIcon fontSize='small' />
            </Avatar>
            <Typography variant='h5' color='black'>Sign In</Typography>
        </Stack>
        <form style={{width:'100%'}} onSubmit={handleSubmit(onSubmit)} noValidate >
        <Stack spacing={3}>
        <Stack spacing={2} sx={{width:'100%', justifyContent:'center', alignItems:'center'}} >
            <TextField 
                id="username" 
                label="Username" 
                variant="outlined" 
                {
                    ...register('username',{
                        required: 'Username is required'
                    })
                }
                required 
                fullWidth
                error = { !!errors.username } 
                helperText = { errors.username?.message }
            />
            <TextField 
                id="password" 
                label="Password" 
                variant="outlined" 
                {
                    ...register('password', {
                        required: 'Password is required'
                    })
                }
                required 
                fullWidth 
                type='password' 
                error = { !!errors.password } 
                helperText = { errors.password?.message }
            />
        </Stack>
        <Button type='submit' variant="contained" sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}}} fullWidth >SIGN IN</Button>
        </Stack>
        </form>
        <Typography 
        variant='body2' 
        sx={{color:'#3f51b5', textDecoration:'underline', cursor:'pointer', '&:hover':{color:'#27399a'}}} 
        onClick={() => {toggle(false)}}
        >
            Don't have an account? Sign Up
        </Typography>
    </Stack>
  )
}

export default Login;