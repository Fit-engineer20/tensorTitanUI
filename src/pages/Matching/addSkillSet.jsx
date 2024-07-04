import React, { useState } from 'react'
import { Stack, Button, Checkbox, Typography, IconButton } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddSkillSet = ({skillSet, setSkillSet}) => {

    const [key, setKey] = useState('');
    const [values, setValues] = useState([]);

    const handleKeyChange = (ev) => {
        setKey(ev.target.value);
        setValues([]);
    }

    const handleValueChange = (ev) => {
        setValues(ev.target.value);
    }

    const dropdownKeys = [
        'Expertise',
        'Experience',
        'Designation'
    ]

    const dropdownValues = {
        'Expertise': [
            'Javascript',
            'Java',
            'C++',
            'Python',
            'SQL',
            'Springboot',
            'React',
            'PSQL',
            'Linux'
        ],
        'Experience':[
            '0-1',
            '1-2',
            '2-3',
            '3-4',
            '4-5',
            '5+'
        ],
        'Designation': [
            'SDE1',
            'SDE2',
            'SDE3',
            'Senior Developer',
            'Manager',
            'Product',
            'UI/UX'
        ]
    };

    const handleAddSkill = () => {
        setSkillSet(
            {...skillSet, [key]:values}
        );
        setKey('');
        setValues([]);
    }

    const handleRemoveSkill = (key) => {
        let newObj = {};
        Object.keys(skillSet).map((item) => {
            if(item !== key)
            {
                newObj[item] = skillSet[item];
            }
        })
        setSkillSet(newObj);
    }

    return(
        <Stack spacing={4}>
        {
            Object.keys(skillSet).map((key) => {
                return(
                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={3} sx={{width:'70%'}}>
                        <Typography variant='body1' sx={{fontWeight:'bold', color:'black'}}>{key}</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {   key !== 'Experience' &&
                                skillSet[key].map((value) => {
                                    return(
                                        <Chip label={value} />
                                    )
                                })
                            }
                            {
                                key === 'Experience' && <Chip label={skillSet[key]} />
                            }
                        </Box>  
                        <IconButton aria-label="delete" onClick={() => {handleRemoveSkill(key)}}>
                            <DeleteIcon fontSize='small' sx={{color:'#E72929'}} />
                        </IconButton> 
                    </Stack>
                )
            })
        }
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{width:'70%'}}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Key</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={key}
                label="Key"
                onChange={handleKeyChange}
            >
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                {
                    dropdownKeys.map((item) => {
                        return(
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        )
                    })
                }
            </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: 300 }} size="small" >
                <InputLabel id="demo-multiple-chip-label">Values</InputLabel>
                <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple = {key !== 'Experience'}
                value={values}
                onChange={handleValueChange}
                input={<OutlinedInput id="select-multiple-chip" label="Values" />}
                renderValue={(selected) => {
                    if(key === 'Experience'){
                        return(
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                <Chip key={selected} label={selected} />
                            </Box>
                        )
                    }
                    return(
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                        </Box>
                    )
                }}
                MenuProps={MenuProps}
                disabled = {key === ''}
                >
                {dropdownValues[key] && dropdownValues[key].map((item) => (
                    <MenuItem key={item} value={item}>
                        <Checkbox checked={skillSet[key].indexOf(item) > -1} />
                        <ListItemText primary={item} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <Button 
            variant="contained" 
            sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}, width:'35%', height:'40px'}}
            onClick={handleAddSkill}
            >
                <AddIcon fontSize='small' />
                &nbsp;
                ADD
            </Button>
        </Stack>
        </Stack>
    )
}

export default AddSkillSet;