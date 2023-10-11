import * as React from 'react';
import { Box } from "@mui/material";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import socket from './socket';

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

const MatchingForm = React.forwardRef(function MatchingForm() {
    const [difficulty, setDifficulty] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [isMatching, setIsMatching] = React.useState(false); // Track matching state
    const navigate = useNavigate(); // Get navigate for redirection

    const handleDiffChange = (event: SelectChangeEvent) => {
        setDifficulty(event.target.value);
    };

    const handleCatChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    const handleConnect = () => {
        const preferences = {
            difficulty,
            category,
        };

        // Emit the startMatching event to the server with user preferences
        socket.emit('startMatching', preferences);

        // Set matching state to true when attempting to match
        setIsMatching(true);
    };

    // Handle the "matchFound" event from the server
    React.useEffect(() => {
        socket.on('matchFound', (matchedUserPreferences) => {
            // Handle the matched user's preferences here
            console.log('Match Found:', matchedUserPreferences);
            setIsMatching(false); // Set matching state to false
            // Redirect to the question page with the code editor
            navigate('/question'); // Update the route as needed
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('matchFound');
        };
    }, [navigate]);

    return (
        <Box sx={style}>
            <h2><center>Please select a difficulty and question category.</center></h2>
            <h4><center>We will attempt to connect you with a user who chose the same options as you within 30 seconds.</center></h4>
            <FormControl sx={{ mt: 1, width: '100%' }}>
                <InputLabel id="demo-simple-select-helper-label">Difficulty</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={difficulty}
                    label="Difficulty"
                    onChange={handleDiffChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Easy'}>Easy</MenuItem>
                    <MenuItem value={'Medium'}>Medium</MenuItem>
                    <MenuItem value={'Hard'}>Hard</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ mt: 1, mb: 1, width: '100%' }}>
                <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={category}
                    label="Category"
                    onChange={handleCatChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Algo'}>Algo</MenuItem>
                    <MenuItem value={'ML'}>ML</MenuItem>
                </Select>
            </FormControl>
            {isMatching ? (
                <div>Loading...</div> // Show loading spinner
            ) : (
                <Button sx={{ mt: '5%' }} variant="contained" onClick={handleConnect}>
                    Connect
                </Button>
            )}
        </Box>
    );
});

export default MatchingForm;