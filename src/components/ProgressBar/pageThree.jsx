import React, { useState } from 'react'
import { Button, InputBase, Stack, Typography } from '@mui/material';
import { FileUploader } from "react-drag-drop-files";

const PageThree = ({ onButtonClick }) => {

    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);

        console.log(file);
    };

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
        <Button 
        variant="contained" 
        sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}, width:'60%'}}
        onClick={() => { onButtonClick('pagefour') } }
        >
          Next
        </Button>
    </Stack>
  )
}

export default PageThree;