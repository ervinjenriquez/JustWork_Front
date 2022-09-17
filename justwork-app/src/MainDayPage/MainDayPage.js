import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';


export default function MainDayPage(props) {

    const [DayList, setDayList] = useState([]);
    const [openNewDay, setOpenNewDay] = useState(false);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    const url = '//localhost:8080/days';

    useEffect(() => {
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

    const handleClickNewDay = () => {
        setOpenNewDay(true);
    };

    const handleCloseNewDay = () => {
        setOpenNewDay(false);
    };

    const handleConfirmNewDay = async () => {
        const day = { title, description };
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(day)
        };

        const response = await fetch(url, request);
        const newDay = await response.json();
        setDayList(oldDays => [...oldDays, newDay]);
        console.log('new day added');

        // Resets text fields.
        setTitle("");
        setDescription("");

        handleCloseNewDay();
    };


    return (
        <>
            <h1>JustWork</h1>
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
            <Button variant="outlined" onClick={handleClickNewDay}>
                New Day
            </Button>
            <Dialog open={openNewDay} onClose={handleCloseNewDay}>
                <DialogTitle>Add a New Day</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new day to your workout, please enter a title and description here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        fullWidth
                        margin="dense"
                        id="title"
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        required
                        fullWidth
                        multiline
                        margin="dense"
                        id="description"
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNewDay}>Cancel</Button>
                    <Button onClick={handleConfirmNewDay}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

