import React from 'react'
import { Stack, Avatar, Typography, TextField, Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useForm } from 'react-hook-form';
import { useLazyRegisterQuery } from '../services/userApis';

const SignUp = ({toggle}) => {

    const { register , handleSubmit, formState: { errors, isLoading } } = useForm();
    const [userRegister] = useLazyRegisterQuery();

    const onSubmit = (formValues) => {
        console.log(formValues);
        formValues['role'] = ["ROLE_ADMIN"]
        userRegister(formValues).then((response) => {
            console.log(response);
        })
    }

  return (
    <Stack direction='column' sx={{padding:'20px', height:'calc(100% - 40px)', backgroundColor:'#ffffff' }} justifyContent='center' alignItems='center' spacing={3}>
        <Stack spacing={1} sx={{width:'100%', justifyContent:'center', alignItems:'center'}}>
            <Avatar sx={{backgroundColor:'#f50057'}}>
                <PersonAddIcon fontSize='small' />
            </Avatar>
            <Typography variant='h5' color='black'>Sign Up</Typography>
        </Stack>
        <form style={{width:'100%'}} onSubmit={handleSubmit(onSubmit)} noValidate >
        <Stack spacing={3}>
        <Stack spacing={2} sx={{width:'100%', justifyContent:'center', alignItems:'center'}} >
            <TextField 
                id="username" 
                label="Username" 
                variant="outlined" 
                required 
                fullWidth 
                {
                    ...register('username',{
                        required: 'Username is required'
                    })
                }
                error = { !!errors.username } 
                helperText = { errors.username?.message }
            />
            <TextField 
                id="email" 
                label="Email" 
                variant="outlined" 
                required 
                fullWidth 
                {
                    ...register('email',{
                        required: 'Email is required'
                    })
                }
                error = { !!errors.email } 
                helperText = { errors.email?.message }
            />
            <TextField 
                id="password" 
                label="Password" 
                variant="outlined" 
                required 
                fullWidth 
                type='password' 
                {
                    ...register('password',{
                        required: 'Password is required'
                    })
                }
                error = { !!errors.password } 
                helperText = { errors.password?.message }
            />
        </Stack>
        <Button type='submit' variant="contained" sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}}} fullWidth >SIGN UP</Button>
        </Stack>
        </form>
        <Typography 
        variant='body2' 
        sx={{color:'#3f51b5', textDecoration:'underline', cursor:'pointer', '&:hover':{color:'#27399a'}}} 
        onClick={() => {toggle(true)}}
        >
            Already have an account? Sign In
        </Typography>
    </Stack>
  )
}

export default SignUp