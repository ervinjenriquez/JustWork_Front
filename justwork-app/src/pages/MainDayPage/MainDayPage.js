import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import NewDayForm from '../../forms/NewDayForm.js';
import DeleteDayModal from '../../forms/DeleteDayModal.js';

export default function MainDayPage() {

    const [DayList, setDayList] = useState([]);

    const url = '//localhost:8080/days';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setDayList(json);
                console.log(json);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center"><NewDayForm url={url}/></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DayList.map((day) => (
                            <TableRow
                                key={day.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center" data-test-id="IndividualDayId">
                                    {day.id}
                                </TableCell>

                                <TableCell align="center" >
                                    <Link to={`/individualDayPage/${day.id}`} data-test-id="IndividualDayLink">
                                        {day.title}
                                    </Link>
                                </TableCell>
                                <TableCell align="center" data-testid="IndividualDayDescription">{day.description}</TableCell>
                                <TableCell align="center" data-test-id="IndividualDayDelete">
                                    <DeleteDayModal dayid={day.id}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
