import React from 'react'
import { Button, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

const PageFour = ({ onButtonClick }) => {
  return (
    <Stack sx={{width:'100%', justifyContent:'center', alignItems:'center'}} spacing={4}>
        <Stack spacing={1} alignItems='center'>
          <ErrorRoundedIcon sx={{color:'#B80000', fontSize:'70px'}} />
          <Typography variant='h6' color='grey' > Content not posted to fusion </Typography>
        </Stack>
        <Button 
        variant="contained" 
        sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}, width:'60%'}}
        onClick={() => { onButtonClick('pagetwo') } }
        >
          POST TO FUSION
        </Button>
    </Stack>
  )
}

export default PageFour;