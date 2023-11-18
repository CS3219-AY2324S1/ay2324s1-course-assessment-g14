import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MatchingForm from './MatchingForm';

export default function ButtonModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>
                Find a Match
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <MatchingForm />
            </Modal>
        </>
    );
}
