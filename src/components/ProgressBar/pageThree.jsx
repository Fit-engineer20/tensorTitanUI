import React, { useState } from 'react'
import { Button, InputBase, Stack, Typography } from '@mui/material';
import { FileUploader } from "react-drag-drop-files";
import { useUploadInvoiceMutation } from '../../services/filesApi';


const PageThree = ({row, updateDetailsOnUpdate, onButtonClick }) => {

    const {id, emailAttachment } = row;
    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(emailAttachment);
    const [ uploadInvoice ] = useUploadInvoiceMutation();
    const handleChange = (file) => {
        setFile(file);
    };

    const handleUpload = () => {
      var formData = new FormData();
      formData.append('file', file);
      uploadInvoice({
        file: formData,
        emailMsgId: id
      }).then((response) => {
        console.log(response);
      })
    }

    const fileTypes = ["PDF", "DOCX", "JPEG", "JPG", "PNG"];

  return (
    <Stack sx={{width:'100%', justifyContent:'center', alignItems:'center'}} spacing={4}>
        <Stack spacing={2} alignItems='center'>
            <Typography variant='h6' color='grey' >Upload Invoice</Typography>
            <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            />
            <Typography variant='body1' color='grey' >{file ? file?.name : 'no file uploaded'}</Typography>
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
            onClick={() => { onButtonClick('pagefour') } }
            >
              NEXT
            </Button>
          )
        }
    </Stack>
  )
}

export default PageThree;