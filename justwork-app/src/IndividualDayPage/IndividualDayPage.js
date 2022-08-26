import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Switch } from "@mui/material";
import { Link } from "react-router-dom";


export default function IndividualDayPage(props) {

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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Title</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {DayList.map((day) => (
                            <TableRow
                                key={day.title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {day.id}
                                </TableCell>

                                {DayList.map((exercises) => (


                                    <TableCell align="center"
                                        key={day.exercises.title}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        {day.exercises.title}
                                    </TableCell>
                                ))
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

