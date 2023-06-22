import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

export default function NewExerciseForm(props) {

    const [openNewExercise, setOpenNewExercise] = useState(false);
    const [title, setTitle] = useState(null);
    const url = '//localhost:8080/exercises/' + props.dayId;

    const handleClickNewExercise = () => {
        setOpenNewExercise(true);

    };

    const handleCloseNewExercise = () => {
        setOpenNewExercise(false);
    };

    const handleConfirmNewExercise = async () => {

        const exercise = { title };
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(exercise)
        };
        await fetch(url, request);
        console.log('new exercise added');

        // Resets text fields.
        setTitle("");

        handleCloseNewExercise();
        reload();
    };

    const validation = () => {
        formRef.current.reportValidity()

        if (formRef.current.reportValidity() !== false) {
            handleConfirmNewExercise();
        }
    }

    const reload = () => window.location.reload();

    const formRef = React.useRef();

    return (
        <div>
            <Button variant="outlined" onClick={handleClickNewExercise} text-align="center">
                New exercise
            </Button>
            <Dialog open={openNewExercise} onClose={handleCloseNewExercise}>
                <DialogTitle>Add a New exercise</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new exercise to your workout, please enter a title here.
                    </DialogContentText>
                    <form ref={formRef}>
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            margin="dense"
                            id="title"
                            label="Title"
                            value={title || ""}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNewExercise}>Cancel</Button>
                    <Button onClick={() => validation()}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}