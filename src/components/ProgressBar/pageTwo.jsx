import React, { useState } from 'react'
import { Button, InputBase, Stack, Typography } from '@mui/material';
import { useAttachEntityMutation } from '../../services/emailApis';

const PageTwo = ({ row, updateDetailsOnUpdate, onButtonClick }) => {

    const { id,  entityGuid, entityNumber } = row;
    const [shipment, setShipment] = useState('');
    const [uploaded, setUploaded] = useState(entityGuid ? true : false);
    const [attachShipment] = useAttachEntityMutation();

    const handleChange = (ev) => {
        setShipment(ev.target.value);
    }

    const handleUpload = () => {
      attachShipment({
        emailMessageId: id,
        entityNumber: shipment
      }).then((response) => {
        console.log(response);
        if(response?.data){
          setUploaded(true);
          updateDetailsOnUpdate();
        }

        if(response?.error){
          alert(response?.error?.data?.error?.errorMap?.errorMessage ?? "Something went wrong or shipment not found try with some other shipment ID");
        }
      })
  }

  return (
    <Stack sx={{width:'100%', justifyContent:'center', alignItems:'center'}} spacing={4}>
      {
        entityGuid ?
        (
          <>
            <Stack spacing={2} alignItems='center'>
              <InputBase 
              sx={{border:'solid 0.5px grey', padding:'10px', height:'40px', borderRadius:'5px'}} 
              placeholder='EAXXX76XX' 
              fullWidth
              value={entityNumber}
              disabled = {true}
            />
          </Stack>
          <Button 
          variant="contained" 
          sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}, width:'60%'}}
          onClick={() => { onButtonClick('pagethree') } }
          >
            NEXT
          </Button>
        </>
        ) :
        (
          <>
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
          {
            !uploaded ?
            (
              <Button 
              variant="contained" 
              sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}, width:'60%'}}
              onClick={handleUpload} 
              >
                UPLOAD
              </Button>
            ) :
            (
              <Button 
              variant="contained" 
              sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}, width:'60%'}}
              onClick={() => { onButtonClick('pagethree') } }
              >
                NEXT
              </Button>
            )
          }
          </>
        )
      }
      </Stack>
  )
}

export default PageTwo;