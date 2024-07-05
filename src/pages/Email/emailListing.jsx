import React, {useEffect, useState, useMemo} from 'react'
import { Stack, Typography, InputBase, Button, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { convert } from 'html-to-text'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { MainContainer } from '../../styles';
import { useLazyGetAllEmailsQuery } from '../../services/emailApis';

export const getRequestLogRequestBody = (
    pageNo,
    pageSize
  ) => {
    const requestBody = {
        pageNumber: pageNo,
        pageSize: pageSize
    };
    return requestBody;
  };


const EmailListing = () => {

    const navigate = useNavigate();
    const [fetchAllEmails, {data, isLoading}] = useLazyGetAllEmailsQuery();
    const defaultPageSize = 10;
    const [paginationInfo, setPaginationInfo] = useState({
        pageNo: 0,
        pageSize: defaultPageSize
    });

    const onPaginationChange = ({
        pageNumber,
        pageSize
    }) => {
        setPaginationInfo({ pageNo: pageNumber, pageSize });
        fetchAllEmails(
            getRequestLogRequestBody(paginationInfo?.pageNo, paginationInfo?.pageSize)
        );
    };

    const handlePageChange = (event, newPage) => {
        onPaginationChange({ pageNumber: newPage, pageSize: paginationInfo?.pageSize });
    };

    const handleRowsPerPageChange = (event) => {
        onPaginationChange({ pageNumber: 0, pageSize: event.target.value });
    };

    const updateListOnUpdate = () => {
        fetchAllEmails(
            getRequestLogRequestBody(paginationInfo?.pageNo, paginationInfo?.pageSize)
        );
    };

    const columns = [
        { 
            id: 'subject', 
            label: 'Subject', 
            minWidth: 170,
        },
        { 
            id: 'accountEmail', 
            label: 'Account Email', 
            minWidth: 170 
        },
        {
            id:'entityNumber',
            label:'Entity Number',
            minWidth: 170
        },
        {
            id: 'fromAddress',
            label: 'From Address',
            minWidth: 170,
        },
        {
            id: 'receivedDate',
            label: 'receivedDate',
            minWidth: 170,
            format: (value) => { 
               const date = new Date(value) 
               return date.toLocaleString('en-US');
            },
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 170,
        }
    ];

    const rows = useMemo(() => data?.data ?? [], [data?.data]);
    
    
    useEffect(() => {
        fetchAllEmails(
            getRequestLogRequestBody(paginationInfo?.pageNo, paginationInfo?.pageSize)
        );
    }, [])

    return (
    <MainContainer>
        <Stack sx={{ backgroundColor:'#ffffff', padding:'20px 2%', borderRadius:'10px' }} spacing={4}>
            <Stack>
                <Typography variant='h4' color='black'> Email Listing </Typography>
            </Stack>
            <Stack direction='row' spacing={2}>
                <InputBase sx={{border:'solid 0.5px grey', padding:'10px', height:'40px', borderRadius:'5px'}} placeholder='Shipment ID' />
                <InputBase sx={{border:'solid 0.5px grey', padding:'10px', height:'40px', borderRadius:'5px'}} placeholder='Status' />
                <Button variant="contained" sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}}} onClick={() => {console.log(data)}}>Apply Filters</Button>
                <Button variant="outlined" sx={{color:'#3f51b5', borderColor:'#3f51b5', '&:hover':{color:'#27399a', borderColor:'#27399a'}}}>Reset Filters</Button>
            </Stack>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                    .slice(paginationInfo?.pageNo * paginationInfo?.pageSize, paginationInfo?.pageNo * paginationInfo?.pageSize + paginationInfo?.pageSize)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.entityNumber}>
                            {columns.map((column) => {
                            const value = row[column.id] ?? '-';
                            const handleClick = () => {
                                navigate('/email-details', { state: { row } } );
                            }
                            if(column.id === 'subject'){
                                return (
                                    <Tooltip title={value} placement='top' arrow>
                                        <TableCell key={column.id} align={column.align} sx={{color:'#3f51b5', '&:hover':{textDecoration:'underline', cursor:'pointer'}}} onClick={handleClick} >
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                    </Tooltip>
                                );
                            }else if(column.id === 'status'){
                                return (
                                        <TableCell key={column.id} align={column.align}>
                                            <Stack direction='row' alignItems='center' justifyContent='space-between' >
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value}
                                            </Stack>
                                        </TableCell>
                                );
                            }

                            return (
                                <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                            );
                            })}
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data?.totalElements ?? 0} 
                rowsPerPage={paginationInfo?.pageSize}
                page={paginationInfo?.pageNo}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
            </Paper>
        </Stack>
    </MainContainer>
    )
}

export default EmailListing;