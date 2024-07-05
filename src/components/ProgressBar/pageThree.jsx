import React, { useState } from 'react'
import { Button, InputBase, Stack, Typography } from '@mui/material';
import { FileUploader } from "react-drag-drop-files";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useUploadInvoiceMutation } from '../../services/filesApi';


const PageThree = ({row, updateDetailsOnUpdate, onButtonClick }) => {

    const {id, emailAttachment, attachments } = row;
    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(attachments.length);
    const [ uploadInvoice ] = useUploadInvoiceMutation();
    const handleChange = (file) => {
        setFile(file);
    };

    const handleUpload = () => {
      var formData = new FormData();
      formData.append('file', file);
      formData.append('emailMsgId', id);
      uploadInvoice(formData).then((response) => {
        if(response?.data){
          setUploaded(true);
          updateDetailsOnUpdate();
        }

        if(response?.error){
          alert("Something went wrong, try to upload again");
        }
      })
    }

    const fileTypes = ["PDF", "DOCX", "JPEG", "JPG", "PNG"];

  return (
    <Stack sx={{width:'100%', justifyContent:'center', alignItems:'center'}} spacing={4}>
        {
          uploaded ?
            (<Stack spacing={1} alignItems='center'>
              <CheckCircleIcon sx={{color:'#3f51b5', fontSize:'70px'}} />
              <Typography variant='h6' color='grey' > Invoice Uploaded Successfully </Typography>
              {
                row?.invoiceStatus === 'INVOICE_VERIFIED' 
                ?
                (<Typography variant='h6' color='grey' > Verification Success </Typography>)
                :
                (<Typography variant='h6' color='grey' > Verification Pending </Typography>)
              }
            </Stack>) :
            (
              <Stack spacing={2} alignItems='center'>
                  <Typography variant='h6' color='grey' >Upload Invoice</Typography>
                  <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  />
                  <Typography variant='body1' color='grey' >{file ? file?.name : 'no file uploaded'}</Typography>
              </Stack>
            )
        }
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
            row?.invoiceStatus === 'INVOICE_VERIFIED' 
                ?
                (
                  <Stack direction='row' sx={{width:'100%'}} justifyContent='space-between' alignItems='center'>
                    <Button 
                    variant="contained" 
                    sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}, width:'30%'}}
                    onClick={() => { updateDetailsOnUpdate() } }
                    >
                      REFRESH
                    </Button>

                    <Button 
                    variant="contained" 
                    sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}, width:'30%'}}
                    onClick={() => { () => { alert("Process Reinitiated successfully") } } }
                    >
                      REINITIATE
                    </Button>
                  </Stack>
                )
                :
                (
                  <Button 
                  variant="contained" 
                  sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}, width:'60%'}}
                  onClick={() => { onButtonClick('pagefour') } }
                  >
                    NEXT
                  </Button>
                )
          )
        }
    </Stack>
  )
}

export default PageThree;