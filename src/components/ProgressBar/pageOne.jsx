import React from 'react'
import { Button, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PageOne = ({ onButtonClick }) => {
  return (
    <Stack sx={{width:'100%', justifyContent:'center', alignItems:'center'}} spacing={4}>
        <Stack spacing={1} alignItems='center'>
          <CheckCircleIcon sx={{color:'#3f51b5', fontSize:'70px'}} />
          <Typography variant='h6' color='grey' > Email Processed Successfully </Typography>
        </Stack>
        <Button 
        variant="contained" 
        sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}, width:'60%'}}
        onClick={() => { onButtonClick('pagetwo') } }
        >
          Next
        </Button>
    </Stack>
  )
}

export default PageOne;