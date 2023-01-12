import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

export default function NewDayForm(props) {

    const [openNewDay, setOpenNewDay] = useState(false);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

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
        await fetch(props.url, request);
        console.log('new day added');

        // Resets text fields.
        setTitle("");
        setDescription("");

        handleCloseNewDay();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickNewDay} text-align="center">
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
        </div>
    )
}