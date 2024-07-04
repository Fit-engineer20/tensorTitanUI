import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import { Stack, Typography, Grid } from '@mui/material'
import { MainContainer } from '../../styles'
import CustomProgressBar from '../../components/ProgressBar/progressBar'
import PageOne from '../../components/ProgressBar/pageOne'
import PageTwo from '../../components/ProgressBar/pageTwo'
import PageThree from '../../components/ProgressBar/pageThree'
import PageFour from '../../components/ProgressBar/pageFour'
import { useLazyGetEmailDetailsQuery } from '../../services/emailApis'

const EmailDetails = () => {

    const { state } = useLocation();
    const row = state?.row;

    const [page, setPage] = useState("pageone");
    const [fetchEmail, {data, isLoading} ] = useLazyGetEmailDetailsQuery();

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

    useEffect(() => {
        fetchEmail({
            messmessageId: row?.id
        })
    }, [])

  return (
   <MainContainer>
        <Stack sx={{ backgroundColor:'#ffffff', padding:'20px 2%', borderRadius:'10px'}} spacing={4}>
            <Stack>
                <Typography variant='h4' color='black'> Email Details </Typography>
            </Stack>
            <Grid container>
            {
                Object.keys(row).filter((key) => {
                    if(key === 'attachments') return false;
                    return true;
                }).map((key) => {
                    return(
                        <Grid key={key} item xs={6}>
                            <Stack sx={{padding:'10px 5px'}} spacing={1}>
                                <Typography variant='p1' sx={{color:'black', fontWeight:'bold', textTransform:'capitalize' }}>{key}</Typography>
                                <Typography variant='body1'color='grey'>{row[key]}</Typography>
                            </Stack>
                        </Grid>
                    )
                })
            }
            </Grid>
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
        </Stack>
   </MainContainer>
  )
}

export default EmailDetails