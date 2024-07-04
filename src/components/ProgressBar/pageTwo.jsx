import React, { useState } from 'react'
import { Button, InputBase, Stack, Typography } from '@mui/material';

const PageTwo = ({ onButtonClick }) => {

    const [shipment, setShipment] = useState('');

    const handleChange = (ev) => {
        setShipment(ev.target.value);
    }

  return (
    <Stack sx={{width:'100%', justifyContent:'center', alignItems:'center'}} spacing={4}>
        <Stack spacing={2} alignItems='center'>
          <Typography variant='h6' color='grey' > Enter Shipment ID </Typography>
          <InputBase 
            sx={{border:'solid 0.5px grey', padding:'10px', height:'40px', borderRadius:'5px'}} 
            placeholder='EAXXX76XX' 
            fullWidth
            value={shipment}
            onChange={handleChange}
          />
        </Stack>
        <Button 
        variant="contained" 
        sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}, width:'60%'}}
        onClick={() => { onButtonClick('pagethree') } }
        >
          Next
        </Button>
    </Stack>
  )
}

export default PageTwo;