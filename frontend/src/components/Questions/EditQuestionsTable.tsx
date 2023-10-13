import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    TablePagination,
    SelectChangeEvent,
    IconButton, Typography, Collapse,
} from '@mui/material';
import { useData } from "../../data/data.context";
import EditQuestionTab from "./EditQuestionTab";
import Question from "./Question";

const ITEMS_PER_PAGE_OPTIONS = [5, 10]; // Number of items to display per page

interface EditQuestionsTableProps {
    onEdit: (editedQuestion: Question) => void;
    onDelete: (questionToDelete: Question) => void;
}

const EditQuestionsTable: React.FC<EditQuestionsTableProps> = ({onEdit, onDelete}) => {
    const [questionsData, setQuestions] = useState<Question[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_PAGE_OPTIONS[0]);
    const [expandedQuestion, setExpandedQuestion] = useState<string | false>(false);

    const { questions, getQuestions } = useData();

    useEffect(() => {
        async function getInterviewQuestions() {
            getQuestions();
        }
        getInterviewQuestions();
        // console.log("here");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setQuestions(questions);
        //console.log(questionsData);
    }, [questions]);

    const handlePageChange = (event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleChangeItemsPerPage = (
        event: SelectChangeEvent<unknown>,
    ) => {
        setItemsPerPage(event.target.value as number);
        setCurrentPage(1);
    };

    const handleExpandClick = (title: string) => {
        expandedQuestion === title ? setExpandedQuestion(false) : setExpandedQuestion(title);
    }

    const indexOfLastQuestion = currentPage * itemsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
    const currentQuestions = questionsData.slice(indexOfFirstQuestion, indexOfLastQuestion);

    return (
        <><div style={{overflowY: 'auto', display: "flex"}}>
            <TableContainer component={Paper} style={{ margin: '10px', padding: '10px' }}>
                <Table style={{ minWidth: 650, fontSize: '14px', tableLayout:'fixed'}}>
                    <TableHead>
                        <TableRow >
                            <TableCell width='5%' />
                            <TableCell width='40%'>Title</TableCell>
                            <TableCell width='35%'>Categories</TableCell>
                            <TableCell width='20%'>Difficulty</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentQuestions.map((question:Question) => (
                            <React.Fragment key={question.title}>
                                <TableRow
                                    sx={{ '& > *': { borderBottom: 'unset' }}}
                                    hover
                                    onClick={() => handleExpandClick(question.title)}
                                    selected={expandedQuestion === question.title}
                                >
                                    <TableCell>
                                        <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => handleExpandClick(question.title)}
                                        >
                                            {expandedQuestion === question.title ?
                                                <Typography>▼</Typography> : <Typography>▶</Typography>}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell component="th">{question.title}</TableCell>
                                    <TableCell>{question.categories.join(', ')}</TableCell>
                                    <TableCell>{question.difficulty}</TableCell>
                                </TableRow>
                                <TableRow key={question.title + "_details"}>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                        <Collapse in={question.title === expandedQuestion} timeout="auto" unmountOnExit>
                                            <EditQuestionTab question={question} onEdit={onEdit} onDelete={onDelete} />
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div><div style={{ display: 'flex', alignItems: 'center' }}>
            <Select
                value={itemsPerPage}
                onChange={handleChangeItemsPerPage}
                style={{ marginTop: '10px' }}
            >
                {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                        {`${option} per page`}
                    </MenuItem>
                ))}
            </Select>

            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={questionsData.length}
                rowsPerPage={itemsPerPage}
                page={currentPage - 1}
                onPageChange={handlePageChange} />
        </div></>

    );
};

export default EditQuestionsTable;