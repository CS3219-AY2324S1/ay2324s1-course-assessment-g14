import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useData } from "../../data/data.context";

interface Question {
  id: string;
  title: string;
  tags: string[];
  categories: string[];
  constraints: string[];
  difficulty: string;
  description: string;
  examples: any;
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10]; // Number of items to display per page

const InterviewQuestionsTable: React.FC = () => {
  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    ITEMS_PER_PAGE_OPTIONS[0]
  );
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const { questions, getQuestions } = useData();

  useEffect(() => {
    async function getInterviewQuestions() {
      getQuestions();
    }
    getInterviewQuestions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setQuestionsData(questions);
  }, [questions]);

  const handleCategoriesChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedCategories(event.target.value as string[]);
  };

  const uniqueCategories = Array.from(
    new Set(questionsData.flatMap((question) => question.categories))
  );

  const filteredQuestions = questionsData.filter((question) =>
    selectedCategories.length === 0
      ? true
      : selectedCategories.some((cat) => question.categories.includes(cat))
  );

  const handlePageChange = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeItemsPerPage = (event: SelectChangeEvent<unknown>) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(0);
  };

  const indexOfLastQuestion = (currentPage + 1) * itemsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - itemsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const openQuestionModal = (question: Question) => {
    setSelectedQuestion(question);
    setIsQuestionModalOpen(true);
  };

  const closeQuestionModal = () => {
    setSelectedQuestion(null);
    setIsQuestionModalOpen(false);
  };

  return (
    <>
      {/* Category Filter */}
      <Select
        multiple
        displayEmpty
        value={selectedCategories}
        onChange={handleCategoriesChange}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Filter by category</em>;
          } else {
            return (selected as string[]).join(", ");
          }
        }}
        style={{ marginTop: "10px", marginBottom: "10px", width: "80%" }}
      >
        {uniqueCategories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
      <div style={{ maxHeight: "300px", overflowY: "auto", width: "80%" }}>
        <TableContainer
          component={Paper}
          style={{ margin: "10px", padding: "10px" }}
        >
          <Table style={{ minWidth: 650, fontSize: "14px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Categories</TableCell>
                <TableCell>Difficulty</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentQuestions.map((question: Question, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <Button
                      onClick={() => openQuestionModal(question)}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform: "initial",
                      }}
                    >
                      {question.title}
                    </Button>
                  </TableCell>
                  <TableCell>{question.tags.join(", ")}</TableCell>
                  <TableCell>{question.categories.join(", ")}</TableCell>
                  <TableCell>{question.difficulty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Select
          value={itemsPerPage}
          onChange={handleChangeItemsPerPage}
          style={{ marginTop: "10px" }}
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
          page={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <Dialog
        open={isQuestionModalOpen}
        onClose={closeQuestionModal}
        fullWidth
        maxWidth="md"
      >
        {selectedQuestion && (
          <>
            <DialogTitle>{selectedQuestion.title}</DialogTitle>
            <DialogContent>
              <Typography variant="body2" style={{ padding: "5px" }}>
                <b>Categories:</b> {selectedQuestion.categories.join(", ")}
              </Typography>
              <Typography variant="body2" style={{ padding: "5px" }}>
                <b>Difficulty:</b> {selectedQuestion.difficulty}
              </Typography>
              <Typography variant="body2" style={{ padding: "5px" }}>
                <b>Description</b>: {selectedQuestion.description}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeQuestionModal} color="primary">
                Close
              </Button>
              <Link
                to={`/question/${selectedQuestion.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button color="primary" variant="contained">
                  Solve Question
                </Button>
              </Link>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default InterviewQuestionsTable;
