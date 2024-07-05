import React, {useEffect, useMemo, useState} from 'react'
import { useLocation } from 'react-router-dom'
import { Stack, Typography, Grid, Button } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import { MainContainer } from '../../styles'
import CustomProgressBar from '../../components/ProgressBar/progressBar'
import PageOne from '../../components/ProgressBar/pageOne'
import PageTwo from '../../components/ProgressBar/pageTwo'
import PageThree from '../../components/ProgressBar/pageThree'
import PageFour from '../../components/ProgressBar/pageFour'
import { useLazyGetEmailDetailsQuery } from '../../services/emailApis'

const EmailDetails = () => {

    const { state } = useLocation();
    const {row, updateListOnUpdate } = state;

    const [page, setPage] = useState("pageone");
    const [fetchEmail, {data, isLoading} ] = useLazyGetEmailDetailsQuery();

    const nextPage = (page) => {
        setPage(page);
    };

    const updateDetailsOnUpdate = () => {
        fetchEmail({
            messageId: row?.id
        })
    }

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

    const handleDownload = (url) => {
       window.open(url, '_blank');
    }

    const rowData = useMemo(() => data?.data ?? {}, [data?.data] )

    useEffect(() => {
        fetchEmail({
            messageId: row?.id
        })
    }, [])

    useEffect(() => {
        if(rowData) nextPageNumber(rowData?.stepNo?.toString());
    }, [data?.data])

  return (
   <MainContainer>
        <Stack sx={{ backgroundColor:'#ffffff', padding:'20px 2%', borderRadius:'10px'}} spacing={4}>
            <Stack>
                <Typography variant='h4' color='black'> Email Details </Typography>
            </Stack>
            <Grid container>
            {
                Object.keys(rowData).filter((key) => {
                    if(key === 'attachments' || key === 'runnerInvoiceAttributes' || key === 'emailInvoiceAttributes' || key === 'stepNo') return false;
                    return true;
                }).map((key) => {
                    return(
                        <Grid key={key} item xs={6}>
                            <Stack sx={{padding:'10px 5px'}} spacing={1}>
                                <Typography variant='p1' sx={{color:'black', fontWeight:'bold', textTransform:'capitalize' }}>{key}</Typography>
                                <Typography variant='body1'color='grey'>{rowData[key]}</Typography>
                            </Stack>
                        </Grid>
                    )
                })
            }
            </Grid>
            <hr />
            <Stack spacing={3}>
                <Typography variant='h5' color='black' >Attachments</Typography>
                <Stack spacing={4}>
                    {
                        data?.data?.attachments.map((file) => {
                            return(
                                <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{width:'70%'}}>
                                    <Typography variant='body1' sx={{color:'grey'}}>{file?.fileName ?? '-'}</Typography>
                                    <Button 
                                    variant="contained" 
                                    sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}, width:'35%', height:'40px'}}
                                    onClick={() => { handleDownload(file?.preSignedUrl) }}
                                    >
                                        <DownloadIcon fontSize='small' />
                                        &nbsp;
                                        DOWNLOAD
                                    </Button>
                                </Stack>
                            )
                        })
                    }
                </Stack>
            </Stack>
            <hr />
            <Stack alignItems='center' spacing={5} sx={{width:'100%'}} >
                <Stack alignItems='center' sx={{width:'100%'}}  spacing={1}>
                    <Typography variant='h6' color='black'>UPDATE STATUS</Typography>
                    <Typography variant='body1' color='grey'>{rowData?.subject}</Typography>
                </Stack>
                <CustomProgressBar page={page} onPageNumberClick={nextPageNumber} />
                {
                    {
                        pageone: <PageOne row={row} updateDetailsOnUpdate={updateDetailsOnUpdate} onButtonClick={nextPage} />,
                        pagetwo: <PageTwo row={row} updateDetailsOnUpdate={updateDetailsOnUpdate} onButtonClick={nextPage} />,
                        pagethree: <PageThree row={row} updateDetailsOnUpdate={updateDetailsOnUpdate} onButtonClick={nextPage} />,
                        pagefour: <PageFour />,
                    }[page]
                }
            </Stack>
        </Stack>
   </MainContainer>
  )
}

export default EmailDetails