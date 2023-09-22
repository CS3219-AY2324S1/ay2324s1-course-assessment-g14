// InterviewQuestionsTable.tsx

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, TablePagination, SelectChangeEvent } from '@mui/material';
import { useData } from "../../data/data.context";

interface Question {
  title: string;
  tags: string[];
  categories: string[];
  constraints: string[];
  difficulty: string;
  description: string;
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10]; // Number of items to display per page

const InterviewQuestionsTable: React.FC = () => {
  const [questionsData, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_PAGE_OPTIONS[0]);
  const { questions, getQuestions } = useData();

  useEffect(() => {
    async function getInterviewQuestions() {
      await getQuestions();
    }
    getInterviewQuestions();
    console.log("here");
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

  const indexOfLastQuestion = currentPage * itemsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
  const currentQuestions = questionsData.slice(indexOfFirstQuestion, indexOfLastQuestion);

  return (
    <><div style={{ maxHeight: '300px', overflowY: 'auto', width: '80%' }}>
          <TableContainer component={Paper} style={{ margin: '10px', padding: '10px' }}>
              <Table style={{ minWidth: 650, fontSize: '14px' }}>
                  <TableHead>
                      <TableRow >
                          <TableCell>Title</TableCell>
                          <TableCell>Tags</TableCell>
                          <TableCell>Categories</TableCell>
                          <TableCell>Constraints</TableCell>
                          <TableCell>Difficulty</TableCell>
                          <TableCell>Description</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {currentQuestions.map((question, index) => (
                          <TableRow key={index}>
                              <TableCell>{question.title}</TableCell>
                              <TableCell>{question.tags.join(', ')}</TableCell>
                              <TableCell>{question.categories.join(', ')}</TableCell>
                              <TableCell>{question.constraints.join(', ')}</TableCell>
                              <TableCell>{question.difficulty}</TableCell>
                              <TableCell>{question.description}</TableCell>
                          </TableRow>
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

export default InterviewQuestionsTable;
