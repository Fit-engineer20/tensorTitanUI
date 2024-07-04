import React, { useState } from 'react'
import { Stack, Typography } from '@mui/material'
import UploadModal from './uploadModal';
import { MainContainer } from '../../styles';
import AddSkillSet from './addSkillSet';


const ResumeMatching = () => {

    const [resume, setResume] = useState(null);
    const [skillSet, setSkillSet] = useState({});

    const handleChange = (file) => {
        setResume(file);

        console.log(file);
    };


  return (
    <MainContainer>
        <Stack sx={{ backgroundColor:'#ffffff', padding:'20px 2%', borderRadius:'10px'}} spacing={4}>
            <Stack direction='row' sx={{width:'100%', justifyContent:'space-between', alignItems:'center'}} >
                <Typography variant='h4' color='black'> Resume Matching </Typography>
                <Stack sx={{width:'20%'}}>
                    <UploadModal resume={resume} handleChange={handleChange} />
                </Stack>
            </Stack>
            <Stack spacing={3}>
                <Typography variant='h6' color='grey' >Job Description</Typography>
                <AddSkillSet skillSet={skillSet} setSkillSet={setSkillSet} />
            </Stack>
        </Stack>
    </MainContainer>
  )
}

export default ResumeMatching;