import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';

export default function IndividualDayPage(props) {

    const [ExerciseList, setExerciseList] = useState([]);
    const { dayId } = useParams();

    //localhost:8080/days

    useEffect(() => {
        const url = '//localhost:8080/days/' + dayId;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setExerciseList(json.exercises);
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
                            <TableCell align="center">Exercise</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ExerciseList.map((exercise) => (
                            <TableRow
                                key={exercise.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {exercise.id}
                                </TableCell>

                                <TableCell align="center">{exercise.title}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

