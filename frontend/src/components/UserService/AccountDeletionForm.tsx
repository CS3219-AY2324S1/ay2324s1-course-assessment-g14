import * as React from 'react';
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useAuth } from '../../auth/auth.context';
import { deleteActiveUser } from '../../api/user';
// import socket from './socket';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    display: 'flex-wrap',
    maxHeight: '60%',
    justifyContent: "center",
    textAlign: "center",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: 'auto',
    p: 4,
};

const AccountDeletionForm = React.forwardRef(function AccountDeletionForm() {
    const { user, removeAccount } = useAuth();

    const handleDelete = async () => {
        try {
            if (user?.email) {
                const res = await deleteActiveUser(user.email);
                const res2 = await removeAccount();
            }
          } catch (e) {
            console.log(e)
          }
    };

    return (
        <Box sx={style}>
            <h2><center>Are you sure you want to delete your account?</center></h2>
            <h4><center>This action cannot be reversed.</center></h4>
                <Button sx={{ mt: '5%' }} variant="contained" onClick={handleDelete}>
                    Confirm
                </Button>
        </Box>
    );
});

export default AccountDeletionForm;