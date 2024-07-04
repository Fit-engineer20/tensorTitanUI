import React, { useState } from 'react'
import { Stack, Typography, Box, Modal, Button } from '@mui/material'
import { FileUploader } from "react-drag-drop-files";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 5,
};

const UploadModal = ({resume, handleChange}) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fileTypes = ["PDF", "DOCX", "JPEG", "JPG", "PNG"];

      return (
        <div>
            <Button 
            variant="contained" 
            sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}}}
            onClick={handleOpen}
            fullWidth
            >
                ADD RESUME
            </Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Stack sx={{width:'100%'}} alignItems='center' spacing={3}>
                    <Stack spacing={2} alignItems='center'>
                        <Typography variant='h6' color='grey' >Upload Invoice</Typography>
                        <FileUploader
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                        />
                        <Typography variant='body1' color='grey' >{resume ? resume?.name : 'no file uploaded'}</Typography>
                    </Stack>
                    <Button 
                    variant="contained" 
                    sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}, width:'60%'}}
                    onClick={handleOpen}
                    >
                        Upload
                    </Button>
                </Stack>
            </Box>
            </Modal>
        </div>
      );
}

export default UploadModal