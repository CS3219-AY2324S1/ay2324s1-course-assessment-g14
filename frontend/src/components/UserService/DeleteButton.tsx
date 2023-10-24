import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AccountDeletionForm from './AccountDeletionForm';

export default function DeleteButtonModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>
                Delete Account
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AccountDeletionForm />
            </Modal>
        </>
    );
}
