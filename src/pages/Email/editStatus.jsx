import React, { useState } from 'react'
import { Stack, Typography, Box, Modal, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import CustomProgressBar from '../../components/ProgressBar/progressBar'
import PageOne from '../../components/ProgressBar/pageOne'
import PageTwo from '../../components/ProgressBar/pageTwo'
import PageThree from '../../components/ProgressBar/pageThree'
import PageFour from '../../components/ProgressBar/pageFour'

const EditStatus = ({row}) => {

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

    const [open, setOpen] = React.useState(false);
    const [page, setPage] = useState("pageone");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const nextPage = (page) => {
        setPage(page);
    };

    const nextPageNumber = (pageNumber) => {
        switch (pageNumber) {
        case "1":
            setPage("pageone");
            break;
        case "2":
            setPage("pagetwo");
            break;
        case "3":
            setPage("pagethree");
            break;
        case "4":
            alert("pagefour");
            break;
        default:
            setPage("1");
        }
    };

      return (
        <div>
            <IconButton onClick={handleOpen}>
                <EditIcon fontSize='small' />
            </IconButton>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Stack alignItems='center' spacing={5} sx={{width:'100%'}} >
                    <Stack alignItems='center' sx={{width:'100%'}}  spacing={1}>
                        <Typography variant='h6' color='black'>UPDATE STATUS</Typography>
                        <Typography variant='body1' color='grey'>{row?.subject}</Typography>
                    </Stack>
                    <CustomProgressBar page={page} onPageNumberClick={nextPageNumber} />
                    {
                        {
                            pageone: <PageOne onButtonClick={nextPage} />,
                            pagetwo: <PageTwo onButtonClick={nextPage} />,
                            pagethree: <PageThree onButtonClick={nextPage} />,
                            pagefour: <PageFour />,
                        }[page]
                    }
                </Stack>
            </Box>
            </Modal>
        </div>
      );
}

export default EditStatus