import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, TablePagination, SelectChangeEvent } from '@mui/material';
import { useData } from "../../data/data.context";

interface Question {
  title: string;
  tags: string[];
  categories: string[];
  constraints: string[];
  difficulty: string;
  //description: string;
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10];

const InterviewQuestionsTable: React.FC = () => {
    const [questionsData, setQuestions] = useState<Question[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_PAGE_OPTIONS[0]);
    const { questions, getQuestions } = useData();

    useEffect(() => {
        async function getInterviewQuestions() {
            getQuestions();
        }
        getInterviewQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setQuestions(questions);
    }, [questions]);

    const handleCategoriesChange = (event: SelectChangeEvent<unknown>) => {
        setSelectedCategories(event.target.value as string[]);
    };

    const uniqueCategories = Array.from(new Set(questionsData.flatMap(question => question.categories)));

    const filteredQuestions = questionsData.filter(question => 
        selectedCategories.length === 0 || 
        selectedCategories.some(cat => question.categories.includes(cat))
    );

    const handlePageChange = (event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleChangeItemsPerPage = (
        event: SelectChangeEvent<unknown>,
    ) => {
        setItemsPerPage(event.target.value as number);
        setCurrentPage(1);
    };

    const indexOfLastQuestion = currentPage * itemsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
    const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    return (
        <>
            {/* Category Filter */}
            <Select
                multiple
                value={selectedCategories}
                onChange={handleCategoriesChange}
                renderValue={(selected) => (selected as string[]).join(', ')}
                style={{ marginTop: '10px', marginBottom: '10px', width: '80%' }}
            >
                {uniqueCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </Select>

            <div style={{ maxHeight: '300px', overflowY: 'auto', width: '80%' }}>
                <TableContainer component={Paper} style={{ margin: '10px', padding: '10px' }}>
                    <Table style={{ minWidth: 650, fontSize: '14px' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Tags</TableCell>
                                <TableCell>Categories</TableCell>
                                <TableCell>Constraints</TableCell>
                                <TableCell>Difficulty</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentQuestions.map((question: Question, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{question.title}</TableCell>
                                    <TableCell>{question.tags.join(', ')}</TableCell>
                                    <TableCell>{question.categories.join(', ')}</TableCell>
                                    <TableCell>{question.constraints.join(', ')}</TableCell>
                                    <TableCell>{question.difficulty}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
                    count={filteredQuestions.length}
                    rowsPerPage={itemsPerPage}
                    page={currentPage - 1}
                    onPageChange={handlePageChange} />
            </div>
        </>
    );
};

export default InterviewQuestionsTable;