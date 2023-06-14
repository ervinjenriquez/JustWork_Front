import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import NewExerciseModal from '../../forms/NewExerciseModal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function IndividualDayPage(props) {

    const [ExerciseList, setExerciseList] = useState([]);
    const { dayId } = useParams();

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
    }, [dayId]);


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Exercise</TableCell>
                            <TableCell align="center"> <NewExerciseModal dayId={dayId} /> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ExerciseList.map((exercise) => (
                            <TableRow
                                key={exercise.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" colSpan={6}>
                                    <Accordion align="center">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>{exercise.title}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                display sets eventually here, prob only 3 most recent sets
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

