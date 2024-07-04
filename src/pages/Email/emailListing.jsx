import React, {useState} from 'react'
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
        // fetchAllEmails(getRequestLogRequestBody(pageNumber, pageSize));
    };

    const handlePageChange = (event, newPage) => {
        onPaginationChange({ pageNumber: newPage, pageSize: paginationInfo?.pageSize });
    };

    const handleRowsPerPageChange = (event) => {
        onPaginationChange({ pageNumber: 0, pageSize: event.target.value });
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

    
    const rows = [
        {
            "messageNumber": 31,
            "accountEmail": "techiesCode@outlook.com",
            "recipientTo": "\"techiesCode@outlook.com\" <techiesCode@outlook.com>;Saurabh Joshi <saurabh.joshi@dpworld.com>",
            "recipientCc": "\"joshisaurabh2610@gmail.com\" <joshisaurabh2610@gmail.com>",
            "recipientBcc": null,
            "fromAddress": "Saurabh Joshi <saurabh.joshi@dpworld.com>",
            "subject": "Testing Email Fetch Functionality",
            "body": convert("Hi @Saurabh Joshi<mailto:saurabh.joshi@dpworld.com>,\r\nTesting the functionality of email fetch using java code\r\nShipmentId: SHP001\r\n\r\nHereby attached an pdf of intellectual property and Scanned Invoice\r\n\r\n\r\nThanks,\r\nSaurabh Joshi\r\nSDE1\r\n<html><head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">\r\n<style type=\"text/css\" style=\"display:none;\"> P {margin-top:0;margin-bottom:0;} </style>\r\n</head>\r\n<body dir=\"ltr\">\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\nHi <a href=\"mailto:saurabh.joshi@dpworld.com\" id=\"OWAAM792113\" class=\"tWKOu mention ms-bgc-nlr ms-fcl-b\">\r\n@Saurabh Joshi</a>,</div>\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\nTesting the functionality&nbsp;of email fetch using java code</div>\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\nShipmentId: SHP001</div>\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\n<br>\r\n</div>\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\nHereby attached an pdf of intellectual property and Scanned Invoice</div>\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\n<br>\r\n</div>\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\n<br>\r\n</div>\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\nThanks,</div>\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\nSaurabh Joshi</div>\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\nSDE1</div>\r\n</body>\r\n</html>\r\n"),
            "receivedDate": 1718448676000,
            "status": "ENTITY_ATTACHED",
            "entityNumber": "SHP000111364",
            "entityGuid": "2d7edfc3-5024-4536-8e38-49b79c3dcc4b",
            "entityType": "SHIPMENT",
            "attachments": [
                {
                    "fileName": "Intellectual Property.pdf",
                    "preSignedUrl": "https://tensortitans.s3.ap-south-1.amazonaws.com/techiesCode%40outlook.com/31_Intellectual%20Property.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240702T150146Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604799&X-Amz-Credential=AKIAYS2NSS6HAU7R365P%2F20240702%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=1ef2824a685e43e0e7f1f2468c8a83eee69092687ae2e2cf8cbc21bd09c43269",
                    "expiry": 1720537306084,
                    "filePath": "techiesCode@outlook.com/31_Intellectual Property.pdf"
                },
                {
                    "fileName": "Sacnned Invoice.pdf",
                    "preSignedUrl": "https://tensortitans.s3.ap-south-1.amazonaws.com/techiesCode%40outlook.com/31_Sacnned%20Invoice.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240702T150250Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604799&X-Amz-Credential=AKIAYS2NSS6HAU7R365P%2F20240702%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=c0ee6408fe883bf2c3649d8fe99ad872c86c22e9aae91ef51e08306bfcb632c4",
                    "expiry": 1720537370727,
                    "filePath": "techiesCode@outlook.com/31_Sacnned Invoice.pdf"
                }
            ]
        },
        {
            "messageNumber": 32,
            "accountEmail": "techiesCode@outlook.com",
            "recipientTo": "Techies Code <techiesCode@outlook.com>",
            "recipientCc": null,
            "recipientBcc": null,
            "fromAddress": "Techies Code <techiesCode@outlook.com>",
            "subject": "EmailFunctionality 2",
            "body": convert("FindtheshipmentIDIFPOSSIBLE,ShpIdSHP003423\r\n\r\n\r\n4 valid invoices added as attachments\r\n<html><head>\r\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">\r\n<style type=\"text/css\" style=\"display:none;\"> P {margin-top:0;margin-bottom:0;} </style>\r\n</head>\r\n<body dir=\"ltr\">\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\nFindtheshipmentIDIFPOSSIBLE,ShpIdSHP003423</div>\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\n<br>\r\n</div>\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\n<br>\r\n</div>\r\n<div class=\"elementToProof\" style=\"font-family: Aptos, Aptos_EmbeddedFont, Aptos_MSFontService, Calibri, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);\">\r\n4 valid invoices added as attachments</div>\r\n</body>\r\n</html>\r\n"),
            "receivedDate": 1719933375000,
            "status": "ENTITY_ATTACHED",
            "entityNumber": "SHP000111364",
            "entityGuid": "2d7edfc3-5024-4536-8e38-49b79c3dcc4b",
            "entityType": "SHIPMENT",
            "attachments": [
                {
                    "fileName": "EgyptInvoice.pdf",
                    "preSignedUrl": "https://tensortitans.s3.ap-south-1.amazonaws.com/techiesCode%40outlook.com/32_EgyptInvoice.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240702T151725Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604763&X-Amz-Credential=AKIAYS2NSS6HAU7R365P%2F20240702%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=29d53e188bfb49d460ef77e068986d475dff416909a40bb02c8fca8e08329e0d",
                    "expiry": 1720538208761,
                    "filePath": "techiesCode@outlook.com/32_EgyptInvoice.pdf"
                },
                {
                    "fileName": "EgyptSeaAgency.pdf",
                    "preSignedUrl": "https://tensortitans.s3.ap-south-1.amazonaws.com/techiesCode%40outlook.com/32_EgyptSeaAgency.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240702T151756Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604775&X-Amz-Credential=AKIAYS2NSS6HAU7R365P%2F20240702%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=1e32ab89b7344124f7f509b12a5eb5517426109860f8f74e27c13ebbc3e0714c",
                    "expiry": 1720538252612,
                    "filePath": "techiesCode@outlook.com/32_EgyptSeaAgency.pdf"
                },
                {
                    "fileName": "Maersk.pdf",
                    "preSignedUrl": "https://tensortitans.s3.ap-south-1.amazonaws.com/techiesCode%40outlook.com/32_Maersk.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240702T151808Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604799&X-Amz-Credential=AKIAYS2NSS6HAU7R365P%2F20240702%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=902aa2ff8bb9e780454187d2591feaa892848a77d0669aa10fff3e46a82ecd41",
                    "expiry": 1720538287541,
                    "filePath": "techiesCode@outlook.com/32_Maersk.pdf"
                },
                {
                    "fileName": "MLHArabic.pdf",
                    "preSignedUrl": "https://tensortitans.s3.ap-south-1.amazonaws.com/techiesCode%40outlook.com/32_MLHArabic.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240702T151813Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Credential=AKIAYS2NSS6HAU7R365P%2F20240702%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=ad7c4f5de5aadea3f91ecd49a7dd56e3b30480502bdfe6552d6c086cd544d07f",
                    "expiry": 1720538293875,
                    "filePath": "techiesCode@outlook.com/32_MLHArabic.pdf"
                }
            ]
        }
    ];

    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };
    

    return (
    <MainContainer>
        <Stack sx={{ backgroundColor:'#ffffff', padding:'20px 2%', borderRadius:'10px' }} spacing={4}>
            <Stack>
                <Typography variant='h4' color='black'> Email Listing </Typography>
            </Stack>
            <Stack direction='row' spacing={2}>
                <InputBase sx={{border:'solid 0.5px grey', padding:'10px', height:'40px', borderRadius:'5px'}} placeholder='Shipment ID' />
                <InputBase sx={{border:'solid 0.5px grey', padding:'10px', height:'40px', borderRadius:'5px'}} placeholder='Status' />
                <Button variant="contained" sx={{backgroundColor:'#3f51b5', '&:hover':{backgroundColor:'#27399a'}}}>Apply Filters</Button>
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
                            const value = row[column.id];
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
                count={rows.length}
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