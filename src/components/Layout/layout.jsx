import React from 'react';
import { Stack, Typography, Avatar } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';



const MainWrapper = styled.div`
  padding: 20px 2rem;
`

const getInitials = (name) => {
    return {
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    }
}

const Layout = (props) => {
  const { children } = props;

  const navigate = useNavigate();

  return (
    <Stack sx={{width:'100vw', height:'100vh', backgroundColor:'#F4F5F4'}}>
        <Stack sx={{width:'92%', padding:'10px 4%', justifyContent:'space-between', alignItems:'center', height:'60px', backgroundColor:'#ffffff'}} direction='row'>
            <Typography variant='h5' sx={{color:'#002BC4'}} > LOGO </Typography>
            <Stack direction='row' spacing={2} sx={{width:'40%'}} justifyContent='end' >
                <Stack direction='row' spacing={2}>
                    <Stack 
                    direction='row' 
                    spacing={2} 
                    onClick = {() => { navigate('/') }}
                    sx={{
                        padding:'10px 20px',
                        color:'grey',
                        borderRadius:'5px', 
                        cursor:'pointer',
                         '&:hover':{backgroundColor:'#F3F6FC', color:'#002BC4'},
                          "&:hover .MuiSvgIcon-root":{backgroundColor:'#F3F6FC', color:'#002BC4'}}}
                    >
                        <HomeOutlinedIcon fontSize='small' />
                        <Typography variant='body2' sx={{userSelect:'none'}} > Dashboard </Typography>
                    </Stack>
                    {/* <Stack 
                    direction='row' 
                    spacing={2} 
                    onClick = {() => { navigate('/resume-matching') }}
                    sx={{
                        padding:'10px 20px',
                        color:'grey',
                        borderRadius:'5px', 
                        cursor:'pointer',
                        '&:hover':{backgroundColor:'#F3F6FC', color:'#002BC4'}, 
                        "&:hover .MuiSvgIcon-root":{backgroundColor:'#F3F6FC', color:'#002BC4'}}} 
                    >
                        <DescriptionOutlinedIcon fontSize='small' />
                        <Typography variant='body2' sx={{userSelect:'none'}} > Resume Matching </Typography>
                    </Stack> */}
                </Stack>
                <Avatar {...getInitials('Bhavy Rastogi')} sx={{backgroundColor:'#3f51b5'}} />
            </Stack>
        </Stack>
        <MainWrapper>
        {children}
        </MainWrapper>
        <Stack sx={{width:'100%', height:'60px', justifyContent:'center', alignItems:'center', position:'absolute', bottom:'0', backgroundColor:'#ffffff'}}>
            <Typography variant='body2' sx={{color:'grey'}}>(c) 2024 copyright information</Typography>
        </Stack>
    </Stack>
  );
};

export default Layout;
