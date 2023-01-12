import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function DeleteDayModal(props) {

    const [open, setOpen] = useState(false);
    const dayId = props.dayid;

    const handleClickTrashcan = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = async () => {
        const url = '//localhost:8080/days/' + dayId;
        const request = { method: 'DELETE' };

        await fetch(url, request);
        console.log('delete successful.');
        
        handleClose();
    }

    return (
    <div>
        <IconButton aria-label="delete" size="small" onClick={handleClickTrashcan}>
            <DeleteIcon fontSize="inherit"/>
        </IconButton>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Permanently delete?"}
             </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to permanently delete day ID with title TITLE?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirmDelete} autoFocus>Ok, delete</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}
