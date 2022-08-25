import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function MainDayPage(props) {

    const [DayList, setDayList] = useState([]);

    //localhost:8080/days

    useEffect(() => {
        const url = '//localhost:8080/days'

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setDayList(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <h1>JustWork</h1>
            <ul>
                {
                    DayList.map((day, key) => {
                        return <li key={key}>{day.title} and {day.description} and its ID {day.id}</li>
                    })
                }
            </ul>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="middle">ID</TableCell>
                            <TableCell align="middle">Title</TableCell>
                            <TableCell align="middle">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DayList.map((day) => (
                            <TableRow
                                key={day.title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {day.id}
                                </TableCell>
                                <TableCell align="left">{day.title}</TableCell>
                                <TableCell align="left">{day.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

